const { UUID, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Book = sequelize.define(
  'Book',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    publishDate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    paranoid: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
);

module.exports = Book;
