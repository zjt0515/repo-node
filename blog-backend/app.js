var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var md5 = require('md5');
// env
require('dotenv').config();
// db
require('./dao/dbSync');

// routes
var indexRouter = require('./routes/index');
var userRouter = require('./routes/userRoute');
const { expressjwt } = require('express-jwt');
const { ForbiddenError } = require('./utils/ServiceError');

var app = express();

// 各种中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// jwt验证中间件
app.use(
  expressjwt({
    secret: md5(process.env.JWT_SECRET),
    algorithms: ['HS256']
  }).unless({
    // 排除验证token的路由
    path: [{ url: '/api/user/login', methods: ['POST'] }]
  })
);

// 使用路由中间件
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  // res.status(err.status || 500);
  // res.render('error');
  console.log(err.name);
  console.log(err.message);
  if (err.name === 'UnauthorizedError') {
    res.send(new ForbiddenError('权限不足').toResponseJson());
  }
});

module.exports = app;
