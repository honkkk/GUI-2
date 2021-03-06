const express = require('express');
const faunadb = require('faunadb');
const crypto = require('crypto');
const verifySession = require('./verify_session.js');
const requestRouter = require('./request.js')

const eventRouter = express();
const adminClient = new faunadb.Client({secret:"fnAEGDCqcLACAApJFk5QaTFV_saJhibLSf6nyHYY"});
const q = faunadb.query;

// Extract the session and inject with user info
eventRouter.use("/", verifySession)

// Handle event join requests
eventRouter.use("/requests", requestRouter);

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
eventRouter.post("/create", async (req, res) => {
  const {title, month, day, year, min, hour, details, city, state, games, capacity, categories} = req.body;

  // Check that all required data is here
  if (!title || !city || !state || !games || !capacity || !categories) {
    res.status(400).send({status: 'error', server_message: "Missing data, please try again.", error_message: "???"})
    return;
  }
  // title shouldn't be too long...
  if (title.length > 30) {
    res.status(400).send({status: 'error', server_message: "Title too long, please use a shorter title.", error_message: "???"})
    return;
  }

  // Ensure capacity is Invalid
  if (isNaN(capacity) || capacity <= 0 || capacity >= 50) {
    res.status(400).send({status: 'error', server_message: "Please provide a capacity between 1 and 50.", error_message: "???"})
    return;
  }
  // Validate date submitted (constrains ensure no overflow when creating the date)
  let date = new Date(year, month-1, day);
  if (date.getDate() != day || date.getFullYear() != year ||
      date.getMonth()+1 != month || !(min>=0 && min<60) || !(hour>0 && hour<=24)) {
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
            details:details ? details : "",
            city,
            state,
            games,
            capacity,
            categories,
            date: date.toISOString(),
            time: hour+":"+min,
            host: req.body.user,
            users:[]
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
eventRouter.post("/delete/:id", async (req, res) => {
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

// Gets a specific event
// Expects:
// Params:
//  - id
// Action:
//  - returns details on an event
eventRouter.post("/get/:id", async (req, res) => {

  // Checks to make sure the id's format is correct
  const id_re = /[0-9]{18}$/
  if (!id_re.test(req.params.id)) {
    res.status(400).send({status:'error', message:"Invalid or missing id, try again."})
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
      res.status(400).send({status:'error', message:"Event not found."})
      return;
    }
    // Sends the data of the event (not ref because they have it already)
    res.send({status:'success', message:response.data});
  } catch (error) {
    res.status(500).send({status:'error', message:error.message})
    return;
  }
});

// Get all events (this needs to be refined...)
eventRouter.post("/get", async (req, res) => {
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

module.exports = eventRouter;
