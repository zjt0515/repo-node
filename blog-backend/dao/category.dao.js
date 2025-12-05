const { parseArrayData } = require('../utils/utils');
const Category = require('./model/category');

// add
module.exports.addCategoryDao = async function (category) {
  const { dataValues } = await Category.create(category);
  return dataValues;
};

// update
module.exports.updateCategoryDao = async function (id, newCategory) {
  await Category.update(newCategory, {
    where: { id }
  });

  const { dataValues } = await Category.findByPk(id);
  return dataValues;
};

// delete
module.exports.deleteCategoryDao = async function (id) {
  const { count } = Category.findByPk(id);

  await Category.destroy({
    where: {
      id
    }
  });

  return count;
};

/**
 * getOne
 * @param {*} id
 * @returns
 */
module.exports.getCategoryDao = async function (id) {
  const result = await Category.findByPk(id);
  return result ? result.dataValues : result;
};

/**
 * getAll
 */
module.exports.getCategoriesDao = async function () {
  const result = await Category.findAll();
  if (result) {
    return parseArrayData();
  }
};

/**
 * count++
 * @param {*} id
 */
module.exports.addCategoryCountDao = async function (id) {
  const result = await Category.findByPk(id);
  if (result && result.dataValues) {
    result.dataValues.count += 1;
  }
  await result.save();
};

/**
 * count--
 * @param {*} id
 */
module.exports.reduceCategoryCountDao = async function (id) {
  const result = await Category.findByPk(id);
  if (result && result.dataValues) {
    result.dataValues.count -= 1;
  }
  await result.save();
};
