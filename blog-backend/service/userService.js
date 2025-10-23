const md5 = require('md5');
const { loginDao } = require('../dao/userDao');
const jsonwebtoken = require('jsonwebtoken');

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
    const token = jsonwebtoken.sign(userVO, md5(process.env.JWT_SECRET), {
      expiresIn: 60 * 60 * 24 * loginPeriod
    });

    return { token, data: userVO };
  }
  // 查询失败
  return { data: daoResult };
};
