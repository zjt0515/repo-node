const md5 = require('md5');
const sequelize = require('./db');

const User = require('./model/user');

(async function () {
  // 同步模型
  await sequelize.sync({ alter: true });
  // 部分表需要初始化数据
  const userConuts = await User.count();
  if (!userConuts) {
    await User.create({
      loginId: 'root',
      name: '管理员1',
      loginPwd: md5('123456'),
      isAdmin: true
    });
    console.log('成功初始化管理员1');
  }
  console.log('数据库同步成功');
})();
