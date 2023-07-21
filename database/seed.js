const { sequelize } = require('./db');
const seed = require('./seedFn');

seed()
  .then(() => {
    console.log('Seeding success. Yay!!');
  })
  .catch(err => {
    console.error(err);
  })
  .finally(() => {
    sequelize.close();
  })