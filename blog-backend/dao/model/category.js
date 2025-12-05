const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Category = sequelize.define(
  'Category',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0
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

module.exports = Category;
