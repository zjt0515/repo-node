const User = require('./model/user');

module.exports.loginDao = async function (loginInfo) {
  const { loginId, loginPwd } = loginInfo;
  // 查询数据库
  return await User.findOne({
    where: { loginId, loginPwd }
  });
};
