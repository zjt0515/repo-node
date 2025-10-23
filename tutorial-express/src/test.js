// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const sequelize = require('./models/db.js');

(async function (params) {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
