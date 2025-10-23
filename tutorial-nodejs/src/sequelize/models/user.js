const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define(
  'user',
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
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

module.exports = User
