const express = require('express');
const faunadb = require('faunadb');

const setupRouter = express();
const adminClient = new faunadb.Client({secret:"fnAEGDCqcLACAApJFk5QaTFV_saJhibLSf6nyHYY"});
const q = faunadb.query;

// Default action on get
setupRouter.get("/", (req, res) => {

});


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
setupRouter.use("/", async (req, res, next) => {
  req.body.user = null;
  const {session} = req.body;
  if (session == null) {
    res.status(401).send("Not authorized to view this page!")
    return;
  }

  try {
    req.body.user = await adminClient.query(
      q.If (
        q.Exists(q.Match(q.Index("get_user_from_session"), session)),
        q.Get(q.Match(q.Index("get_user_from_session"), session)),
        false
      )
    )
    if (!req.body.user) {
      res.status(401).send("Not authorized to view this page (session not found)!")
      return;
    }
  } catch(error) {
    res.status(500).send("internal error: " + error.message)
    return;
  }
  next();
})

// Sets user info on account creation
// Expects:
// Body:
//  - user : string (or ref?)
//  - username : string
//  - birth : date
// Returns:
//  - success / failure
// Actions:
//  - updates user info
//  - sets user status to "prefrences"
setupRouter.post("/user", (req, res) => {
  console.log(req.body.user);
  const {user, username, birth} = req.body;
  if (user == null || username == null || birth == null) {
    res.status(400).send("Data is missing from this request.")
    return;
  }
  res.send("Post on /user")
});

// Sets user prefrences
// Expects:
// Body:
//  - locations : [{town : string (toLower), state : string (toLower)}]
//  - categories : {type:bool}
//  - games : [name:string]
//  - user : string (or ref?)
// Returns:
//  - success/ failure
// Actions:
//  - updates user preferences
//  - sets user status to "complete"
setupRouter.post("/preferences", (req, res) => {
  const {user, locations, categories, games} = req.body;
  if (user == null || locations == null || categories == null || games == null) {
    res.status(400).send("Data is missing from this request.");
    return;
  }
  res.send("Post on /preferences")
});

module.exports = setupRouter;
