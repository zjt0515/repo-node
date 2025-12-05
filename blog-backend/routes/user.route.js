const express = require('express');
const router = express.Router();

const {
  loginService,
  updateUserService,
  deleteUserService
} = require('../service/user.service.js');

const { decodeToken, formatResponse } = require('../utils/utils.js');
const { ValidationError } = require('../utils/ServiceError.js');

/**
 * @openapi
 * /login:
 *   post:
 *     description: userLogin
 *     requestBody: true
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 *         content:
 *           application/json:
 *             schema:
 *               type:
 */
router.post('/login', async function (req, res) {
  // 验证码验证

  // 业务逻辑
  const result = await loginService(req.body);
  if (result.token) {
    res.setHeader('authentication', result.token);
    res.send(formatResponse(200, '登录成功', result.data));
  } else {
    res.send(new ValidationError('账号或密码错误').toResponseJson());
  }
});

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

// 注册用户
router.post('/', async function (req, res, next) {
  const result = await addUserService(req.body);

  res.send(result);
});

// 更新用户
router.put('/', async function (req, res, next) {
  const result = await updateUserService(req.body);

  res.send(result);
});

// 删除用户
router.delete('/', async function (req, res, next) {
  const result = await deleteUserService(req.body);
  res.send(formatResponse(0, '', result));
});

module.exports = router;
