const {
  addCategoryDao,
  updateCategoryDao,
  deleteCategoryDao,
  getCategoriesDao,
  getCategoryDao
} = require('../dao/category.dao');
const { formatResponse } = require('../utils/utils');

/**
 * addOne
 * @param {*} category
 */
module.exports.addCategoryService = async function (category) {
  category.count = 0;

  return formatResponse(0, '', await addCategoryDao(category));
};

/**
 * updateOne
 * @param {*} id
 * @param {*} newCategory
 * @returns
 */
module.exports.updateCategoryService = async function (id, newCategory) {
  const data = await updateCategoryDao(id, newCategory);
  const categoryVO = {
    id: data.id,
    name: data.name,
    count: data.count
  };
  return formatResponse(0, '', categoryVO);
};

/**
 * deleteOne
 * @param {*} id
 * @returns
 */
module.exports.deleteCategoryService = async function (id) {
  return formatResponse(0, '', await deleteCategoryDao(id));
};

/**
 * findAll
 */
module.exports.getCategoriesService = async function () {
  const categories = await getCategoriesDao();
};

/**
 * findOne
 * @param {*} id
 * @returns
 */
module.exports.getCategoryService = async function (id) {
  const category = await getCategoryDao(id);

  let categoryVO;
  if (category) {
    categoryVO = {
      id: category.id,
      name: category.name,
      count: category.count
    };
  }
  return formatResponse(0, '', categoryVO);
};
