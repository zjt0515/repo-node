const {
  addArticleDao,
  updateArticleDao,
  deleteArticleDao,
  getArticleDao,
  getArticlesDao
} = require('../dao/article.dao');
const {
  addCategoryCountDao,
  reduceCategoryCountDao
} = require('../dao/category.dao');
const { formatResponse } = require('../utils/utils');
const articleMapper = require('./mapper/article.mapper');

/**
 * 增加一篇文章
 * @param {*} article
 * @returns
 */
module.exports.addArticleService = async function (article) {
  // 处理目录
  article.toc = JSON.stringify(article.toc);

  // 初始化
  article.likeCount = 0;
  article.createDate = Date.now();

  const data = await addArticleDao(article);

  // 分类.count++
  if (article.categoryId) {
    await addCategoryCountDao(article.categoryId);
  }
  return formatResponse(0, '', data);
};

module.exports.updateArticleService = async function (id, newArticle) {
  const data = await updateArticleDao(id, newArticle);
  return formatResponse(0, '', data);
};

/**
 * 删除一篇文章
 * @param {*} id
 * @returns
 */
module.exports.deleteArticleService = async function (id) {
  const data = await getArticleDao(id);

  // 分类count--
  if (data && data.categoryId) {
    await reduceCategoryCountDao(id);
  }

  // 删除对应评论

  // 删除文章
  await deleteArticleDao(id);
  return formatResponse(0, '', data);
};

/**
 * 获取一篇文章
 * @param {*} id
 * @returns
 */
module.exports.getArticleService = async function (id) {
  const data = await getArticleDao(id);

  return formatResponse(0, '', articleMapper(data));
};

/**
 * 获取文章
 * @returns
 */
module.exports.getArticlesService = async function () {
  const data = await getArticlesDao();
  return formatResponse(0, '');
};
