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
        q.Select (
          ["data", "user_id"],
          q.Get(q.Match(q.Index("get_user_from_session"), session))
        ),
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
setupRouter.post("/user", async (req, res) => {
  let {user, username, birth_year, birth_month, birth_day} = req.body;

  // Validate existence of user and username
  if (user == null || username == null) {
    res.status(400).send("Data is missing from this request.")
    return;
  }

  // Validate date of birth submitted (constrains ensure no overflow when creating the date)
  date = new Date(birth_year, birth_month, birth_day);
  if (date.getDate() != birth_day || date.getFullYear() != birth_year ||
      date.getMonth() != birth_month || birth_year > 2100 || birth_month > 11 ||
      birth_day > 31 || birth_year < 1900 || birth_month < 0 || birth_day < 0) {
    res.status(400).send("Incorrect or missing date format, try again!")
    return;
  }
  // Validates DOB is in the past
  if (date.getTime() >= Date.now()) {
    res.status(400).send("We know you wern't just born...")
    return;
  }

  // Validates the username
  let re = /^[a-z]([a-z,0-9]?){4,15}$/
  username = username.toLowerCase();
  if (!re.test(username)) {
    res.status(400).send("Invalid username. Username must start with a letter, only contain letters and numbers, and be between 5 and 16 characters long.")
    return;
  }

  // Makes sure account hasn't yet set the user info
  try {
    const result = await adminClient.query(
      q.Equals (
        q.Select(['data', 'status'], q.Get(q.Ref( q.Collection("user"), user))),
        "pending"
      )
    )
    if (!result) {
      res.status(401).send("User data cannot be set right now!")
      return;
    }
  } catch(error) {
    res.status(500).send("internal error: " + error.message)
    return;
  }

  // Updates the iser in the DB
  try {
    await adminClient.query(
      q.Update (
        q.Ref( q.Collection('user'), user ),
        {
          data: {
            status: "preferences",
            username,
            birth:date.toISOString()
          }
        }
      )
    )
  } catch(error) {
    res.status(500).send("internal error: " + error.message);
    return;
  }
  res.send("User updated!")
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
setupRouter.post("/preferences", async (req, res) => {
  let {user, locations, categories, games} = req.body;
  if (user == null || locations == null || categories == null || games == null) {
    res.status(400).send("Data is missing from this request.");
    return;
  }

  try {
    const result = await adminClient.query(
      q.Equals (
        q.Select(['data', 'status'], q.Get(q.Ref( q.Collection("user"), user))),
        "preferences"
      )
    )
    if (!result) {
      res.status(401).send("Preferences data cannot be set right now!")
      return;
    }
  } catch(error) {
    res.status(500).send("internal error: " + error.message)
    return;
  }

  // Parse the json data
  try {
    locations = JSON.parse(locations)
    categories = JSON.parse(categories)
    games = JSON.parse(games)
  } catch(error) {
    res.status(500).send("internal error occured: " + error.message)
    return;
  }

  // Makes sure location is uniform
  locations.forEach(item => {
    item.town = item.town.toLowerCase();
    item.state = item.state.toLowerCase();
  });

  try {
    const response = await adminClient.query(
      q.Do(
        q.Create(
          q.Collection("pref"),
          {
            data: {
              user_id:user,
              locations,
              categories,
              games
            },
          }
        ),
        q.Update (
          q.Ref( q.Collection('user'), user ),
          {
            data: {
              status: "complete",
            }
          }
        )
      )
    )
  } catch (error) {
    res.status(500).send("internal error: " + error.message);
    return;
  }
  res.send("Post on /preferences")
});

module.exports = setupRouter;
