const Article = require('./model/article');
const Category = require('./model/category');

/**
 * addOne
 * @param {*} article
 * @returns
 */
module.exports.addArticleDao = async function (article) {
  const result = await Article.create(article);
  console.log(result);
};

/**
 * updateOne
 * @param {*} id
 * @param {*} newArticle
 * @returns
 */
module.exports.updateArticleDao = async function (id, newArticle) {
  await Article.update(newArticle, {
    where: { id }
  });
  const result = Article.findByPk(id);
  if (result) {
    return result.dataValues;
  }
};

/**
 * deleteOne
 * @param {*} article
 * @returns
 */
module.exports.deleteArticleDao = async function (article) {
  return await Article.destroy({
    where: {
      id
    }
  });
};

/**
 * getOne
 * @param {*} id
 * @returns
 */
module.exports.getArticleDao = async function (id) {
  const result = await Article.findByPk(id);
  if (result) {
    return result.dataValues;
  }
};

/**
 * getAll
 * @returns
 */
module.exports.getArticlesDao = async function () {
  const result = await Article.findAll();
  console.log(result);
  // if (result) {
  //   return result.dataValues;
  // }
};

/**
 * 分页查询文章
 * @param {*} pageInfo
 * @param {string} pageInfo.page
 * @param {string} pageInfo.limit
 * @param {string} pageInfo.categoryId
 */
module.exports.findArticlesByPageDao = async function (pageInfo) {
  const { limit, page, categoryId } = pageInfo;
  let result;
  if (categoryId) {
    result = await Article.findAndCountAll({
      where: {
        categoryId
      },
      include: {
        model: Category,
        as: 'category'
      },
      limit: limit * 1,
      offset: (page * 1 - 1) * limit
    });
  } else {
    result = await Article.findAndCountAll({
      include: {
        model: Category,
        as: 'category'
      },
      limit: limit * 1,
      offset: (page * 1 - 1) * limit
    });
  }
};
