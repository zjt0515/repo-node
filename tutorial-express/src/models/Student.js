const { UUID, DataTypes } = require('sequelize');
const sequelize = require('./db');

const Student = sequelize.define(
  'Student',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false
    },
    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    mobile: {
      type: DataTypes.STRING(11),
      allowNull: false
    }
  },
  {
    paranoid: true,
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
);

module.exports = Student;
