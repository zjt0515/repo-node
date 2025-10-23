const { UUID, DataTypes } = require('sequelize');
const sequelize = require('./db');

// 模型对象
const Admin = sequelize.define(
  'Admin',
  {
    // id: {
    //   type: DataTypes.BIGINT,
    //   allowNull: false
    // },
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
    }
  },
  {
    paranoid: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
);

module.exports = Admin;
