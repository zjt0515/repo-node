const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Banner = sequelize.define(
  'Bannner',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    midImg: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bigImg: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
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

module.exports = Banner;
