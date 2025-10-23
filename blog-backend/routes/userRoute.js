const express = require('express');
const router = express.Router();
const { loginService } = require('../service/userService.js');
const { decodeToken, formatResponse } = require('../utils/utils.js');
const { token, format } = require('morgan');

// 登录
router.post('/login', async function (req, res, next) {
  // 验证码验证

  // 业务逻辑
  const result = await loginService(req.body);
  if (result.token) {
    res.setHeader('authentication', result.token);
    res.send(formatResponse(200, '登录成功', result.data));
  }
});

// 恢复登录
router.get('/whoami', async function (req, res, next) {
  // 获取token
  // const token = req.get('Authorization');
  // console.log(token);

  // 解析token
  const result = decodeToken(req.get('Authorization'));
  console.log(result);
  res.send(
    formatResponse(0, '', {
      loginId: result.loginId,
      name: result.name,
      id: result.id
    })
  );
});

module.exports = router;
