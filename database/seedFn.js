const { sequelize } = require('./db');
const { User } = require('.');
const { Account } = require('.');
const { users, accounts } = require('./seedData');


const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await User.bulkCreate(users);
  await Account.bulkCreate(accounts);
}

module.exports = seed;