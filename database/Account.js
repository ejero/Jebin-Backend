const { Sequelize, sequelize } = require("./db");

const Account = sequelize.define("account", {
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  gender: Sequelize.STRING,
  account_number: Sequelize.INTEGER,
});

module.exports = { Account };
