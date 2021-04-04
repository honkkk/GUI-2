const express = require('express');

const accountRouter = express();

// Default action on get
accountRouter.get("/", (req, res) => {

});

// User login
// Expects:
// Body:
//  - email : string
//  - password : string
// Returns:
//  - created session id
// Action:
//  - Creates a session in DB
accountRouter.post("/login", (req, res) => {
  const {email, password} = req.body;
  if (email == null || password = null) {
    // This is an error state :(
  }



});

// User account creation
// Expects:
// Body:
//  - email : string
//  - conf_email : string
//  - password : string
//  - conf_password : string
// Returns:
//  - created session id
// Actions:
//  - Create user in DB
//  - Sets user to "pending"
//  - Creates a session in DB
accountRouter.post("/create", (req, res) => {
  const {email, conf_email, password, conf_password} = req.body;
  if (email == null || password = null) {
    // This is an error state :(
  }
  if (email != conf_email || password != conf_password) {
    // This is an error state :(
  }

});

// Route for setting up account, requirements and responses pending...
accountRouter.post("/setup", (req, res) => {

});

// Hashes password before storing in DB
// password: string - the user's raw text password
// salt: int - a number to salt the user's password with
// Return: hashed password
const getHashedPassword = (password, salt) => {
    const sha256 = crypto.createHash('sha256')
    const hash = sha256.update(salt + password).digest('base64')
    return hash
}

// Generates a session key (Maybe theres a crypto way to do this)
const generateAuthToken = () => {
    return crypto.randomBytes(30).toString('hex')
}

// Generates a unique salt of 8 bytes
const generateSalt = () => {
  return crypto.randomBytes(8).toString('hex')
}
