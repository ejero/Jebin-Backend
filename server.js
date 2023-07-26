const express = require("express");
const app = express();
const { sequelize } = require("./database/db");
const path = require("path");
const cors = require("cors");

// Use CORS middleware to allow requests from all origins (*)
app.use(cors());

// Defining Routers
const router = require(path.join(__dirname, "routes", "accounts"));
const routerUser = require(path.join(__dirname, "routes", "user"));

// connecting server to router
// Testing comment
app.use("/", router);
app.use("/user", routerUser);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

module.exports = { app, sequelize };
