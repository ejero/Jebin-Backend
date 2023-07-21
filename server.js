const express = require("express");
const app = express();
const { sequelize } = require("./database/db");
const path = require("path");

const router = require(path.join(__dirname, "Routes", "accounts"));
const routerUser = require(path.join(__dirname, "Routes", "user"));

// connecting server to router
app.use("/", router);
app.use("/user", routerUser);

module.exports = { app, sequelize };
