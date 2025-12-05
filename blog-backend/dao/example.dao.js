const Example = require('./model/example');

/**
 * addOne
 * @param {*} example
 * @returns
 */
module.exports.addExampleDao = async function (example) {
  return await Example.create(example);
};

/**
 * updateOne
 * @param {*} id
 * @param {*} newExample
 * @returns
 */
module.exports.updateExampleDao = async function (id, newExample) {
  await Example.update(newExample, {
    where: { id }
  });
  const result = Example.findByPk(id);
  if (result) {
    return result.dataValues;
  }
};

/**
 * deleteOne
 * @param {*} example
 * @returns
 */
module.exports.deleteExampleDao = async function (example) {
  return await Example.destroy({
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
module.exports.getExampleDao = async function (id) {
  const result = await Example.findByPk(id);
  if (result) {
    return result.dataValues;
  }
};

/**
 * getAll
 * @returns
 */
module.exports.getExamplesDao = async function () {
  const result = await Example.findAll();
  if (result) {
    return result.dataValues;
  }
};
