const express = require('express');
const faunadb = require('faunadb');
const crypto = require('crypto');
const verifySession = require('./verify_session.js');

const requestRouter = express();
const adminClient = new faunadb.Client({secret:"fnAEGDCqcLACAApJFk5QaTFV_saJhibLSf6nyHYY"});
const q = faunadb.query;

// Send a join request
// Expects
// Body:
// - user
// Params:
// - id of the event
// Action
//  Gets event, checks if request can be sent, if so adds request to request collection
// Returns:
//  Success or error...
requestRouter.post("/join/:id", async (req, res) => {

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
    // if event full, report it
    if (event.data.capacity <= event.data.users.length) {
      res.status(400).send("This event is at capacity and cannot be joined.")
      return;
    }
    // if request to join is from the host, report it
    if (event.data.host == req.user) {
      res.status(400).send("You are own this event.")
      return;
    }
    // If user is already in event, report it
    event.data.users.forEach((item, i) => {
      if (item == req.body.user) {
        res.status(400).send("You are already in this event.")
        return;
      }
    });
    // Attempt to create entry
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
    return;

    // Sends the data of the event (not ref because they have it already)
  } catch (error) {
    // If user already has request sent for the specific event, report it
    if (error.message === "instance not unique") {
      res.status(400).send({status: 'error', server_message: "You already have a request to join this event!", error_message: error.message})
      return;
    }
    res.status(500).send(error.message)
    return;
  }
});

// Accept a request from a user to join the event
// Expects
// Body:
// - user
// - status: a string that's either "accept" or "deny"
// Params:
// - id of the request
// Actions
//  If there is space, allow the user to join the event or deny them
requestRouter.post("/reply/:id", async (req, res) => {
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
    // Make sure the user has access to this request
    if (req.body.user != request.data.host) {
      res.status(401).send("You are not authorized to manage this request.");
      return;
    }

    // if we accept the request, make sure they can fit, if so add them to the event and delete the request
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

    // if deny, just delete the request
    if (req.body.status == "deny") {
      await adminClient.query(q.Delete(request.ref));
      res.send("deleted");
      return;
    }

    throw new Error("please provide an accept or deny status.");

    // Sends the data of the event (not ref because they have it already)
  } catch (error) {
    res.status(500).send(error.message)
    return;
  }
})

// Get all requests for a user to respond to
// Expects
// Body:
// - user
// Returns
//  A list of requests or an error
requestRouter.post("/", async (req, res) => {
  try {
    let response = await adminClient.query(
      q.Map(
        q.Paginate(
          q.Match(q.Index('get_user_requests'), req.body.user)
        ),
        q.Lambda('x', q.Select('data', q.Get(q.Var('x'))))
      )
    )
    res.send({status:'success', message:response.data})
    return;
  } catch (error) {
    if (error.message = "instance not found") {
      res.send({status:'success', message:[]})
      return;
    }
    res.status(500).send(error.message)
    return;
  }
})


module.exports = requestRouter;
