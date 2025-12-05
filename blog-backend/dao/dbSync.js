const md5 = require('md5');
const sequelize = require('./db');
const banners = require('../mock/mockBanner');

// Models
const User = require('./model/user');
const Banner = require('./model/banner');
const Category = require('./model/category');
const Article = require('./model/article');

// associations
Article.belongsTo(Category, { foreignKey: 'categoryId', targetKey: 'id' });
Category.hasMany(Article, {
  foreignKey: 'categoryId',
  targetKey: 'id',
  as: 'categories'
});

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
    console.log('[init table] User init success');
  }

  // init banner
  const bannerCounts = await Banner.count();
  if (!bannerCounts) {
    await Banner.bulkCreate(banners);

    console.log('[init table] Banner init success');
  }

  console.log('数据库同步成功');
})();
