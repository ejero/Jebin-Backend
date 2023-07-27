const express = require("express");
const { Account } = require("../database");

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

// Get all accounts
accountRouter.get("/accounts", async (req, res) => {
  try {
    const accounts = await Account.findAll();
    console.log("accounts", accounts);
    res.status(200).json(accounts);
  } catch (error) {
    console.error("Error fetching accounts:", error);
    res.status(500).json({ error: "Error fetching accounts" });
  }
});

// Register a new account
accountRouter.post("/accounts", async (req, res) => {
  try {
    // Data that comes from the body
    const { firstname, lastname, gender, account_number } = req.body;

    // Create a new account record in the database
    const newAccount = await Account.create({
      firstname,
      lastname,
      gender,
      account_number,
    });

    res.status(201).json(newAccount); // Sends back newly created account
  } catch (error) {
    console.error("Error creating account:", error); // Send back error if unable to create account
    res.status(500).json({ error: "Error creating account" });
  }
});

module.exports = accountRouter;
