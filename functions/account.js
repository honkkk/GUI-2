const express = require('express');
const setupRouter = require('./setup.js')
const faunadb = require('faunadb');
const crypto = require('crypto');
const verifySession = require('./verify_session.js');

const accountRouter = express();
const adminClient = new faunadb.Client({secret:"fnAEGDCqcLACAApJFk5QaTFV_saJhibLSf6nyHYY"});
const q = faunadb.query;

// User login
// Expects:
// Body:
//  - email : string
//  - password : string
// Returns:
//  - created session id
// Action:
//  - Creates a session in DB
accountRouter.post("/login", async (req, res) => {
  const {email, password} = req.body;
  if (email === null || password === null) {
    res.status(400).send({status: 'error', server_message: "Data is missing from this request, try again.", error_message: "000"})
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).send({status: 'error', server_message: "Invalid email format.", error_message: "002"})
    return;
  }

  var user;

  // Get the user from the email
  try {
    const response = await adminClient.query(
      q.If (
        q.Exists(q.Match(q.Index("get_user_from_email"), email)),
        q.Get(q.Match(q.Index("get_user_from_email"), email)),
        false
      )
    )
    if (!response) {
      res.status(400).send({status: 'error', server_message: "Account not found, please create an account!", error_message: "100"})
      return;
    }
    user = response;
  } catch (error) {
    res.status(500).send({status: 'error', server_message: "an internal error occured", error_message: error.message})
  }

  // check hashed password against what we have
  if (user.data.hashed_password !== getHashedPassword(password, user.data.salt)) {
    res.status(401).send({status: 'error', server_message: "Incorrect email/password", error_message: "010"})
    return;
  }

  try {
    const response = await adminClient.query(
      q.Create(
        q.Collection("session"),
        {
          data: {
            user_id:user.ref.id,
            token:generateAuthToken()
          },
          ttl: q.TimeAdd(q.Now(), 900, 'seconds')
        }
      )
    )
    req.body.session = response.data.token;
    res.send({status:'success', token:req.body.session});
  } catch (error) {
    res.status(500).send({status: 'error', server_message: "an internal error occured while signing in", error_message: error.message})
    return;
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
accountRouter.post("/create", async (req, res) => {
  var {email, conf_email, password, conf_password} = req.body;
  // Input cleaning
  if (email === null || password === null) {
    res.status(400).send({status: 'error', server_message: "Data is missing from this request, try again.", error_message: "000"})
    return;
  }
  if (email.toLowerCase() !== conf_email.toLowerCase() || password !== conf_password) {
    res.status(400).send({status: 'error', server_message: "Email or password missmatch", error_message: "001"})
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).send({status: 'error', server_message: "Invalid email format.", error_message: "002"})
    return;
  }

  const pw_re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,32}$/;
  if (!pw_re.test(password)) {
    res.status(400).send({status: 'error', server_message: "Password does not meet requirements. Must contain an uppercase and lowercase letter, a number, and be 8 to 32 characters long.", error_message: "003"})
    return;
  }

  // Prevents same email with different case from being used
  email = email.toLowerCase();

  // password encrypring
  const salt = generateSalt()
  const hashed_password = getHashedPassword(password, salt)

  // Adds user to DB
  try {
    req.body.user = await adminClient.query(
      q.Create(
        q.Collection("user"),
        {
          data: {email, hashed_password, salt, status: "pending",}
        }
      )
    )
  } catch (error) {
    if (error.message === "instance not unique") {
      res.status(400).send({status: 'error', server_message: "Email already registered!", error_message: error.message})
      return;
    }
    res.status(500).send({status: 'error', server_message: "an internal error occured", error_message: error.message})
  }

  try {
    const response = await adminClient.query(
      q.Create(
        q.Collection("session"),
        {
          data: {
            user_id:req.body.user.ref.id,
            token:generateAuthToken()
          },
          ttl: q.TimeAdd(q.Now(), 900, 'seconds')
        }
      )
    )
    req.body.session = response.data.token;
  } catch (error) {
    res.status(500).send({status: 'error', server_message: "an internal error occured while signing in, try again", error_message: error.message})
    return;
  }
  // Returns user to client
  res.send({status:'success', token:req.body.session});
});

// Returns if the user is logged in or not
// Expects:
// Body:
//  - session : string
// Returns:
//  - true or false
accountRouter.post("/status", async (req, res) => {
  var {session} = req.body;
  // Input cleaning
  if (session === null) {
    res.status(400).send({status: 'error', server_message: "Data is missing from this request, try again.", error_message: "000"})
    return;
  }

  try {
    const response = await adminClient.query(
      q.Get(
        q.Match(
          q.Index("get_user_from_session"), session
        )
      )
    )
    res.send({status:"success", message:true})
  } catch (error) {
    if (error.message === "instance not found") {
      res.send({status:"success", message:false})
      return;
    }
    res.status(500).send({status: 'error', server_message: "an internal error occured while signing in, try again", error_message: error.message})
    return;
  }
});

// Extract the session and inject with user info
accountRouter.use("/", verifySession);

accountRouter.post("/", async (req, res) => {
  try {
    let response = await adminClient.query(
      q.If(
        q.Exists(q.Ref(q.Collection('user'),req.body.user)),
        q.Select('data',q.Get(q.Match(q.Index('get_user_info'), req.body.user))),
        false
      )
    )
    res.send({status:'success', message:response});
    return;
  } catch (error) {
    res.status(500).send({status: 'error', server_message: "an internal error occured while signing in, try again", error_message: error.message})
    return;
  }
});

// Route for setting up account, requirements and responses pending...
accountRouter.use("/setup", setupRouter);

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

// Tests to see if email is valid
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

module.exports = accountRouter;
