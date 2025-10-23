const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define(
  'User',
  {
    loginId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    loginPwd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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

module.exports = User;
