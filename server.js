const express = require("express");
const app = express();
const { sequelize } = require("./database/db");
const path = require("path");
const cors = require("cors");

const router = require(path.join(__dirname, "routes", "accounts"));
const routerUser = require(path.join(__dirname, "routes", "user"));

// connecting server to router
// Testing comment
app.use("/", router);
app.use("/user", routerUser);
// Use CORS middleware to allow requests from all origins (*)
app.use(cors());
module.exports = { app, sequelize };
