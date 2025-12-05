const {
  addExampleDao,
  updateExampleDao,
  deleteExampleDao,
  getExampleDao,
  getExamplesDao
} = require('../dao/example.dao');
const { formatResponse } = require('../utils/utils');

module.exports.addExampleService = async function (example) {
  const data = await addExampleDao(example);
  return formatResponse(0, '', data);
};

module.exports.updateExampleService = async function (id, newExample) {
  const data = await updateExampleDao(id, newExample);
  return formatResponse(0, '', data);
};

module.exports.deleteExampleService = async function (id) {
  const data = await deleteExampleDao(id);
  return formatResponse(0, '', data);
};

module.exports.getExampleService = async function (id) {
  const data = await getExampleDao(id);
  return formatResponse(0, '', data);
};

module.exports.getExamplesService = async function () {
  const data = await getExamplesDao();
  return formatResponse(0, '', data);
};
