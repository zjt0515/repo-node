const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Example = sequelize.define(
  'Example',
  {
    name: {
      type: DataTypes.STRING,
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

module.exports = Example;
