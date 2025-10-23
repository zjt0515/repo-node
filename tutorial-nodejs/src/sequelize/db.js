const { Sequelize } = require('sequelize')

// 方法 3: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('tutorial_sequelize', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',
})

async function testConnection() {
  try {
    await sequelize.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
testConnection()

module.exports = sequelize
