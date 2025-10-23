require('./user')
require('./class')
require('./book')
require('./student')

const sequelize = require('../db')

sequelize.sync({ alert: true }).then(() => {
  console.log('同步所有模型')
})
