const User = require('./model/user');

// login
module.exports.loginDao = async function (loginInfo) {
  const { loginId, loginPwd } = loginInfo;
  // 查询数据库
  return await User.findOne({
    where: { loginId, loginPwd }
  });
};

// add
module.exports.addUserDao = async function (user) {
  return await User.create(user);
};

// update
module.exports.updateUserDao = async function (newUser) {
  return await User.update(newUser, {
    where: {
      loginId: newUser.loginId
    }
  });
};

// delete
module.exports.deleteUserDao = async function (id) {
  return await User.destroy({
    where: {
      id
    }
  });
};
