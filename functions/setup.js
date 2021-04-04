const express = require('express');

const setupRouter = express();

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
setupRouter.use("/", (req, res) => {
  const {session} = req.body;
  if (session == null) {
    // Error State :(
  }
  req.body.user = null;

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
  const {user, username, birth};
  if (user == null || username == null || birth == null) {
    // Error State :(
  }

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
  const {user, locations, categories, games};
  if (user == null || locations == null || categories == null || games == null) {
    // Error State :(
  }
  
});
