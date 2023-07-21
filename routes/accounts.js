const express = require("express");

// Router
const accountRouter = express.Router();

//Express validator
const { check, validationResult } = require("express-validator");

// Adding middlewear
accountRouter.use(express.json());
accountRouter.use(express.urlencoded({ extended: true })); // Use extended so we can use all info in URL

// Require the server.js file
// const { app, server } = require("../server");

// Welcome Message
accountRouter.get("/", async (req, res, next) => {
  try {
    res.send(`<h1>Welcome to My Jebrin call center!</h1>`);
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = accountRouter;
