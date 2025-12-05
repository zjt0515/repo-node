const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Article = sequelize.define(
  'Article',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumb: {
      type: DataTypes.STRING
    },
    desc: {
      type: DataTypes.STRING
    },
    htmlContent: {
      type: DataTypes.TEXT
    },
    toc: {
      type: DataTypes.TEXT
    },
    createDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    likeCount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    // 这是其他模型参数
    freezeTableName: true,
    paranoid: true,
    createdAt: false,
    updatedAt: false
  }
);

module.exports = Article;
