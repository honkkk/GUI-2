const express = require('express');
const faunadb = require('faunadb');
const crypto = require('crypto');
const verifySession = require('./verify_session.js');

const setupRouter = express();
const adminClient = new faunadb.Client({secret:"fnAEGDCqcLACAApJFk5QaTFV_saJhibLSf6nyHYY"});
const q = faunadb.query;

// Extract the session and inject with user info
setupRouter.use("/", verifySession)

// Create an event
// Expects:
// Body:
//  - title : string
//  - month : string
//  - day : string
//  - year : string
//  - min : string
//  - hour : string
//  - details : string
//  - city : string
//  - state : string
//  - catigories : {catigories:bool}
//  - games : [string]
//  - user : string
// Action:
//  - adds event to database
//  - returns id of game
setupRouter.post("/create", async (req, res) => {
  const {title, month, day, year, min, hour, details, city, state, games, capacity} = req.body;
  if (!title || !details || !city || !state || !games || !capacity) {
    // data missing
  }
  // title shouldn't be too long...
  if (title.length > 30) {
    res.status(400).send({status: 'error', server_message: "Title too long, please use a shorter title.", error_message: "???"})
    return;
  }

  if (isNaN(capacity) || capacity <= 0 || capacity >= 50) {
    res.status(400).send({status: 'error', server_message: "Please provide a capacity between 1 and 50.", error_message: "???"})
    return;
  }
  // Makes sure a list is past as games
  // DEBUG: This has been removed to make postman requests, add back in production.
  /*if (!Array.isArray(games)) {
    res.status(400).send({status: 'error', server_message: "Game list is not correct, try again.", error_message: "000"})
    return;
  }*/
  // Validate date of birth submitted (constrains ensure no overflow when creating the date)
  let date = new Date(year, month, day, hour, min);
  if (date.getDate() != day || date.getFullYear() != year ||
      date.getMonth() != month || !(min>=0 && min<60) || !(hour>0 && hour<=24)) {
    res.status(400).send({status: 'error', server_message: "Incorrect or missing date, try again.", error_message: "000"})
    return;
  }
  // Validates date is in the future
  if (date.getTime() <= Date.now()) {
    res.status(400).send({status: 'error', server_message: "Invalid date. Please have your event be in the future.", error_message: "002"})
    return;
  }
  // Validates city and state
  const state_re = /AL|AK|AS|AZ|AR|CA|CO|CT|DE|DC|FM|FL|GA|GU|HI|ID|IL|IN|IA|KS|KY|LA|ME|MH|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|MP|OH|OK|OR|PW|PA|PR|RI|SC|SD|TN|TX|UT|VT|VI|VA|WA|WV|WI|WY$/
  const city_re = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/
  if (!state_re.test(state)) {
    res.status(400).send({status: 'error', server_message: "Invalid location format!", error_message: "???"})
    return;
  }
  if (!city_re.test(city)) {
    res.status(400).send({status: 'error', server_message: "Invalid location format!", error_message: "???"})
    return;
  }

  // Creates a new event with user as host
  try {
    await adminClient.query(
      q.Create(
        q.Collection("event"),
        {
          data: {
            title,
            details,
            city,
            state,
            games,
            capacity,
            date: date.toISOString(),
            host: req.body.user
          }
        }
      )
    )
  } catch(error) {
    res.status(500).send({status: 'error', server_message: "an internal error occured", error_message: error.message})
    return;
  }

  res.send({status:"success", message:req.body});
});

// Deletes an event
// Expects:
// Params:
//  - id
// Body:
//  - user : string
// Action:
//  - deletes event from DB
setupRouter.post("/delete/:id", async (req, res) => {
  // Verify that id is in proper format
  const id_re = /[0-9]{18}$/
  if (!id_re.test(req.params.id)) {
    res.status(400).send("Invalid or missing id, try again.")
    return;
  }
  // get event if it exists
  try {
    const response = (await adminClient.query(
      q.If(
        q.Exists(q.Ref(q.Collection("event"),req.params.id)),
        q.Get(q.Ref(q.Collection("event"),req.params.id)),
        false
      )
    ));
    if (!response) {
      res.status(400).send("Event not found.")
      return;
    }
    // stop non hosts from deleting an event
    if (response.data.host != req.body.user) {
      res.status(401).send("You must be an event host to delete an event, nice try...");
      return;
    }
    // remove the event from the DB
    await adminClient.query (
      q.Delete(q.Ref(q.Collection("event"),req.params.id))
    )
  } catch (error) {
    res.status(500).send(error.message)
    return;
  }
  res.send("Event deleted!")
});

// Updates an event
// Expects:
// Params:
//  - id
// Body:
//  - user : string
//  - data to update : obj
// Action:
//  - deletes event from DB
setupRouter.post("/update:id", async (req, res) => {
  res.send("This is a work in progress...");
});

// Gets a specific event
// Expects:
// Params:
//  - id
// Action:
//  - returns details on an event
setupRouter.post("/get/:id", async (req, res) => {

  // Checks to make sure the id's format is correct
  const id_re = /[0-9]{18}$/
  if (!id_re.test(req.params.id)) {
    res.status(400).send("Invalid or missing id, try again.")
    return;
  }

  // Gets the event from the DB
  try {
    const response = (await adminClient.query(
      q.If(
        q.Exists(q.Ref(q.Collection("event"),req.params.id)),
        q.Get(q.Ref(q.Collection("event"),req.params.id)),
        false
      )
    ));
    // if not found, report it
    if (!response) {
      res.status(400).send("Event not found.")
      return;
    }
    // Sends the data of the event (not ref because they have it already)
    res.send(response.data);
  } catch (error) {
    res.status(500).send(error.message)
    return;
  }
});

setupRouter.post("/get", async (req, res) => {
  // Gets the event from the DB
  try {
    const response = await adminClient.query(
      q.Call("get_events")
    );
    // Sents returned events
    res.send({status:"success", message:response.data});
  } catch (error) {
    res.status(500).send(error.message)
    return;
  }
});


setupRouter.post("/join/:id", async (req, res) => {

  // Checks to make sure the id's format is correct
  const id_re = /[0-9]{18}$/
  if (!id_re.test(req.params.id)) {
    res.status(400).send("Invalid or missing id, try again.")
    return;
  }

  // Gets the event from the DB
  try {
    const event = (await adminClient.query(
      q.If(
        q.Exists(q.Ref(q.Collection("event"),req.params.id)),
        q.Get(q.Ref(q.Collection("event"),req.params.id)),
        false
      )
    ));
    // if not found, report it
    if (!event) {
      res.status(400).send("Event not found.")
      return;
    }
    if (event.data.capacity <= event.data.users.length) {
      res.status(400).send("This event is at capacity and cannot be joined.")
      return;
    }
    if (event.data.host == req.user) {
      res.status(400).send("You are own this event.")
      return;
    }
    event.data.users.forEach((item, i) => {
      if (item == req.body.user) {
        res.status(400).send("You are already in this event.")
        return;
      }
    });

    const response = await adminClient.query(
      q.Create(
        q.Collection('request'),
        {
          data: {
            event:req.params.id,
            sender:req.body.user,
            host: event.data.host
          }
        }
      )
    )
    res.send(response.data);

    // Sends the data of the event (not ref because they have it already)
  } catch (error) {
    if (error.message === "instance not unique") {
      res.status(400).send({status: 'error', server_message: "You already have a request to join this event!", error_message: error.message})
      return;
    }
    res.status(500).send(error.message)
    return;
  }
});


setupRouter.post("/accept/:id", async (req, res) => {
  // Checks to make sure the id's format is correct
  const id_re = /[0-9]{18}$/
  if (!id_re.test(req.params.id)) {
    res.status(400).send("Invalid or missing id, try again.")
    return;
  }

  // Gets the request from the DB
  try {
    const request = (await adminClient.query(
      q.If(
        q.Exists(q.Ref(q.Collection("request"),req.params.id)),
        q.Get(q.Ref(q.Collection("request"),req.params.id)),
        false
      )
    ));
    // if not found, report it
    if (!request) {
      res.status(400).send("Request not found.")
      return;
    }

    if (req.body.user != request.data.host) {
      res.status(401).send("You are not authorized to manage this request.");
      return;
    }

    if (req.body.status == "accept") {
      let update_response = await adminClient.query(
        q.Let(
          {
            ref: q.Ref(q.Collection("event"), request.data.event),
            doc: q.Get(q.Var("ref")),
            array: q.Select(["data", "users"], q.Var("doc"))
          },
          q.If(
            q.LT(q.Count(q.Var("array")), q.Select(['data', 'capacity'], q.Var("doc"))),
            q.Do(
              q.Update(q.Var("ref"), { data: { users: q.Append(request.data.sender, q.Var("array")) } }),
              q.Delete(request.ref)
            ),
            false
          )
        )
      )
      res.send(update_response);
      return;
    }

    if (req.body.status == "deny") {
      await adminClient.query(q.Delete(request.ref));
      res.send("deleted");
      return;
    }

    res.send("what do you want from me...");
    return;

    // Sends the data of the event (not ref because they have it already)
  } catch (error) {
    if (error.message === "instance not unique") {
      res.status(400).send({status: 'error', server_message: "You already have a request to join this event!", error_message: error.message})
      return;
    }
    res.status(500).send(error.message)
    return;
  }
})


module.exports = setupRouter;
