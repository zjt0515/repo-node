// 同步模型
const Admin = require('./Admin');
const Student = require('./Student');
const Class = require('./Class');
const Book = require('./Book');

const sequelize = require('./db');
sequelize.sync({ alter: true });
