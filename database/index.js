const { Account } = require("./Account");
const { CallData } = require("./CallData");
const { User } = require("./User");
const { sequelie, Sequelize } = require("./db");

CallData.belongsTo(User, { foreignKey: "ownerId" }); // CallData table, there will be an ownerIf <- foreign key

User.hasMany(CallData);

module.exports = {
  Account,
  User,
  CallData,
  sequelie,
  Sequelize,
};
