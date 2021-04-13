const express = require('express');
const faunadb = require('faunadb');
var cors = require('cors')

const verifySession = express();
const adminClient = new faunadb.Client({secret:"fnAEGDCqcLACAApJFk5QaTFV_saJhibLSf6nyHYY"});
const q = faunadb.query;

verifySession.use(cors())

// Extract the session and inject with user info
// Expects:
// Body:
//  - session : string
// Response:
//  - err if not found
// Action:
//  - Clear user field if exists (that means it's client defined and cannot be trusted)
//  - Get's userID from session
//  - If it doesn't exist, user is not authorized to access
//  - If user status is complete, user is not authorized to access
//  - Set user in body to the user's ID
verifySession.use("/", async (req, res, next) => {
  req.body.user = null;
  const {session} = req.body;
  if (session === null) {
    res.status(401).send({status: 'error', server_message: "Not authorized to view this page!", error_message: "020"})
    return;
  }

  try {
    req.body.user = await adminClient.query(
      q.If (
        q.Exists(q.Match(q.Index("get_user_from_session"), session)),
        q.Select (
          ["data", "user_id"],
          q.Get(q.Match(q.Index("get_user_from_session"), session))
        ),
        false
      )
    )
    if (!req.body.user) {
      res.status(401).send({status: 'error', server_message: "Not authorized to view this page (session not found)!", error_message: "020"})
      return;
    }
  } catch(error) {
    res.status(500).send({status: 'error', server_message: "an internal error occured", error_message: error.message})
    return;
  }
  next();
})

module.exports = verifySession;
