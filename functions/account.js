const express = require('express');
const setupRouter = require('./setup.js')
const faunadb = require('faunadb');
const crypto = require('crypto');

const accountRouter = express();
const adminClient = new faunadb.Client({secret:"fnAEGDCqcLACAApJFk5QaTFV_saJhibLSf6nyHYY"});
const q = faunadb.query;

// Default action on get
accountRouter.get("/", (req, res) => {
  res.send("Get on /account")
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
accountRouter.post("/login", async (req, res) => {
  const {email, password} = req.body;
  if (email == null || password == null) {
    res.status(400).send("Data is missing from this request.")
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).send("Email is not valid.")
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
      res.status(404).send("Account not found!")
      return;
    }
    user = response;
  } catch (error) {
    res.status(500).send("internal error: " + error.message)
  }

  // check hashed password against what we have
  if (user.data.hashed_password != getHashedPassword(password, user.data.salt)) {
    res.status(401).send("Incorrect email/password");
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
    res.send(req.body.session);
  } catch (error) {
    res.status(500).send("Issue signing in, try again: " + error.message);
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
  if (email == null || password == null) {
    res.status(400).send("Data is missing from this request.");
    return;
  }
  if (email.toLowerCase() != conf_email.toLowerCase() || password != conf_password) {
    res.status(400).send("Email or password missmatch");
    return;
  }
  if (!validateEmail(email)) {
    res.status(400).send("Invalid email format");
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
          data: {email, hashed_password, salt}
        }
      )
    )
  } catch (error) {
    if (error.message == "instance not unique") {
      res.status(400).send("Email already registered!");
      return;
    }
    res.status(500).send(error.message);
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
    res.status(500).send("Issue signing in, try again: " + error.message);
    return;
  }
  // Returns user to client
  res.send(req.body.session)
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
