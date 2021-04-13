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
  const {title, month, day, year, min, hour, details, city, state, games} = req.body;
  if (!title || !details || !city || !state || !games) {
    // data missing
  }
  // Validate date of birth submitted (constrains ensure no overflow when creating the date)
  let date = new Date(year, month, day, hour, min);
  console.log(date, hour, min);
  if (date.getDate() != day || date.getFullYear() != year ||
      date.getMonth() != month || !(min>=0 && min<60) || !(hour>0 && hour<=12)) {
    res.status(400).send({status: 'error', server_message: "Incorrect or missing date, try again.", error_message: "000"})
    return;
  }
  // Validates DOB is in the past
  if (date.getTime() <= Date.now()) {
    res.status(400).send({status: 'error', server_message: "Invalid date. Please have your event be in the future.", error_message: "002"})
    return;
  }

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
            date:date.toISOString(),
            host: req.body.user
          }
        }
      )
    )
  } catch(error) {
    res.status(500).send({status: 'error', server_message: "an internal error occured", error_message: error.message})
    return;
  }

  res.send(req.body);
});

// Deletes an event
// Expects:
// Params:
//  - id
// Body:
//  - user : string
// Action:
//  - deletes event from DB
setupRouter.post("/delete:id", async (req, res) => {
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
setupRouter.post("/delete:id", async (req, res) => {
});

// Gets a specific event
// Expects:
// Params:
//  - id
// Action:
//  - returns details on an event
setupRouter.post("/delete:id", async (req, res) => {
});

module.exports = setupRouter;
