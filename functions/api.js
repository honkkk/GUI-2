const express = require('express');
const serverless = require('serverless-http');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const app = express();
const apiRouter = express.Router();

// Parses the body if it exists
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// Parses user's cookies to fetch session
app.use(cookieParser());

// Get on the base
apiRouter.get("/", (req, res) => {
  res.send(req.body);
})


app.use("/.netlify/functions/api", apiRouter)
module.exports.handler = serverless(app);