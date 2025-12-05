const { expressjwt: jwt } = require('express-jwt');
const md5 = require('md5');

module.exports = jwt({
  secret: md5(process.env.JWT_SECRET),
  algorithms: ['HS256']
}).unless({
  // 排除
  path: [
    { url: '/api/user/login', methods: ['POST'] },
    { url: '/docs', methods: ['GET'] }
  ]
});
