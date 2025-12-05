const md5 = require('md5');
const {
  loginDao,
  updateUserDao,
  addUserDao,
  deleteUserDao
} = require('../dao/user.dao');
const jsonwebtoken = require('jsonwebtoken');
const { ValidationError } = require('sequelize');
const ResultUtils = require('../utils/ResultUtils');
const { formatResponse } = require('../utils/utils');

/**
 * 用户登录
 * @param {*} loginInfo
 * @returns
 */
module.exports.loginService = async function (loginInfo) {
  const { loginId, loginPwd, remember } = loginInfo;
  // 用户名查询
  // 密码校验
  let daoResult = await loginDao({ loginId, loginPwd: md5(loginPwd) });

  if (daoResult && daoResult.dataValues) {
    daoResult = daoResult.dataValues;
    let loginPeriod;

    // DO -> VO
    let userVO = {
      id: daoResult.id,
      loginId: daoResult.loginId,
      name: daoResult.name,
      isAdmin: daoResult.isAdmin
    };

    if (remember) {
      loginPeriod = parseInt(remember);
    } else {
      loginPeriod = 1;
    }

    // 添加token
    console.log('JWTSECRET>>>', process.env.JWT_SECRET);

    const token = jsonwebtoken.sign(userVO, md5(process.env.JWT_SECRET), {
      expiresIn: 60 * 60 * 24 * loginPeriod
    });

    return { token: 'Bearer ' + token, data: userVO };
  }
  // 查询失败
  return { data: daoResult };
};

/**
 * 用户注册
 * @param {*} user
 * @returns
 */
module.exports.addUserService = async function (user) {
  const { loginId, loginPwd } = user;
  const result = await addUserDao({
    loginId,
    loginPwd: md5(loginPwd)
  });
  if (result) {
    return formatResponse(0, '', result.dataValues);
  }
};

/**
 * 更新用户
 * @param {*} updatedUser
 * @returns
 */
module.exports.updateUserService = async function (updatedUser) {
  const result = await loginDao({
    loginId: updatedUser.id,
    loginPwd: updatedUser.oldLoginPwd
  });

  if (result && result.dataValues) {
    console.log(result);

    const newUser = {
      loginId: updatedUser.loginId,
      loginPwd: md5(updatedUser.newLoginPwd),
      name: updatedUser.name
    };

    // update
    await updateUserDao(newUser);

    return formatResponse(0, '', {
      loginId: newUser.loginId,
      name: newUser.name,
      id: result.dataValues.id
    });
  } else {
    throw new ValidationError('旧密码错误');
  }
};

/**
 * 删除用户
 * @param {*} id
 */
module.exports.deleteUserService = async function (id) {
  await deleteUserDao(id);
};
