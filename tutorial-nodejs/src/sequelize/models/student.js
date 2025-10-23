const { Sequelize, DataTypes } = require('sequelize')
const sequelize = require('../db')

const Student = sequelize.define(
  'student',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false,
    },
    sex: {
      type: DataTypes.BOOLEAN,
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

module.exports = Student
