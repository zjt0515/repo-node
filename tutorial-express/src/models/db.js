const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('test', 'root', '12345678', {
  host: 'localhost',
  dialect: 'mysql',
  logging: null
});

sequelize.sync();

module.exports = sequelize;
