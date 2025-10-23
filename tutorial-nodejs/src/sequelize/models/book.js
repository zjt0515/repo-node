const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')

const Book = sequelize.define(
  'book',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imgurl: {
      type: DataTypes.STRING,
    },
    publishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    author: {
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

module.exports = Book
