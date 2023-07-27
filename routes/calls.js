const express = require("express");
const { CallData } = require("../database");

// Router
const callRouter = express.Router();

// Adding middlewear
callRouter.use(express.json());
callRouter.use(express.urlencoded({ extended: true })); // Use extended so we can use all info in URL

// Document a call

callRouter.post("/create-call", async (req, res) => {
  try {
    const { firstName, lastName, date, call_content } = req.body;

    // Call entry
    const newCallData = await CallData.create({
      firstName,
      lastName,
      date,
      call_content,
    });

    // Response
    res.json(newCallData);
  } catch (error) {
    console.error("Error creating CallData:", error);
    res.status(500).json({ error: "Failed to create call data :(" });
  }
});

module.exports = callRouter;
