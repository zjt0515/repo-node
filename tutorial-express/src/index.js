const express = require('express');
const app = express();

app.listen(9528, () => {
  console.log('happy path');
});

app.get('/abc', (req, res) => {
  console.log('请求头', req.headers);
  console.log('请求路径', req.path);
  console.log('请求参数', req.query);
});
