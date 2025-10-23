const { UUID, DataTypes } = require('sequelize');
const sequelize = require('./db');
const Student = require('./Student');

const Class = sequelize.define(
  'Class',
  {
    name: {
      type: DataTypes.STRING
    },
    openDate: {
      type: DataTypes.DATE
    }
  },
  {
    paranoid: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
);

Class.hasMany(Student);

module.exports = Class;
