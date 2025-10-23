const Data = require('../models/Data.js');

exports.addData = async function (dataObj) {
  const data = Data.build(dataObj);
  await data.save();
};

exports.updateData = async function (id, dataObj) {
  Data.update(dataObj, { where: { id } });
};

exports.deleteData = async function (dataId) {
  const data = await Data.findByPk(dataId);
  data.destory();
};
