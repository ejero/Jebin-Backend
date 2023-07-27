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

// Route to delete a call by its ID
callRouter.delete("/delete-call/:id", async (req, res) => {
  try {
    const callId = req.params.id;

    // Find the call entry by ID
    const callData = await CallData.findByPk(callId);

    if (!callData) {
      return res.status(404).json({ error: "Call data not found." });
    }

    // Delete the call entry
    await callData.destroy();

    // Respond with success message
    res.json({ message: "Call data deleted yay!." });
  } catch (error) {
    console.error("Error deleting CallData:", error);
    res.status(500).json({ error: "Failed to delete call data :(" });
  }
});

// Route to get all call data
callRouter.get("/get-all-calls", async (req, res) => {
  try {
    // Retrieve all call data from the database
    const allCallData = await CallData.findAll();

    // Return all calls
    res.json(allCallData);
  } catch (error) {
    console.error("Error fetching CallData:", error);
    res.status(500).json({ error: "Failed to fetch call data :(" });
  }
});
module.exports = callRouter;
