const { Sequelize, sequelize } = require("./db");

const User = sequelize.define("user", {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  employee_number: Sequelize.NUMBER,
  firstname: Sequelize.STRING,
  lastname: Sequelize.STRING,
  email: Sequelize.STRING,
  role: {
    type: Sequelize.STRING,
    defaultValue: "user",
  },
});

module.exports = { User };
