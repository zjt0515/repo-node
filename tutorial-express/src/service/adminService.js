const Admin = require('../models/Admin.js');

exports.addAdmin = async function (adminObj) {
  const admin = Admin.build(adminObj);
  await admin.save();
};

exports.updateAdmin = async function (id, adminObj) {
  await Admin.update(adminObj, { where: { id } });
};

exports.deleteAdmin = async function (adminId) {
  const admin = await Admin.findByPk(adminId);
  admin.destory();
};

exports.login = async function (loginId, loginPwd) {
  const result = await Admin.findOne({
    where: {
      loginId,
      loginPwd
    }
  });
  if (user == null) {
    console.log('查找不到');
  } else {
    return;
  }
};
