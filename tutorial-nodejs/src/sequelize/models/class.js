const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')
const Student = require('./student')

const Class = sequelize.define(
  'class',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    openDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    createdAt: 'createTime',
    updatedAt: 'updateTime',
    deletedAt: 'isDelete',
    paranoid: true,
  }
)
Class.hasMany(Student)

module.exports = Class
