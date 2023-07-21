const { Sequelize, sequelize } = require('./db');

const CallData = sequelize.define('calldata', {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  date: Sequelize.DATE,
  call_content: Sequelize.STRING,
})

module.exports = { CallData };