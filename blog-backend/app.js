var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var md5 = require('md5');

// env
require('dotenv').config();
require('express-async-errors');

// db(sync)
require('./dao/dbSync');

// multer
require('./utils/upload');

// middleware
const jwtMiddleware = require('./middleware/jwtMiddleware');

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swaggerConfig');
//const swaggerDocument = require('./swagger.json');

// routes
var userRoute = require('./routes/user.route');
var uploadRoute = require('./routes/upload.route');
var categoryRoute = require('./routes/category.route');
var articleRoute = require('./routes/article.route');

const { expressjwt: jwt } = require('express-jwt');
const {
  ForbiddenError,
  ServiceError,
  UnknownError
} = require('./utils/ServiceError');

var app = express();

// 各种中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// jwt验证中间件;
// app.use(jwtMiddleware);

// 使用路由中间件
app.use('/api/user', userRoute);
app.use('/api/upload', uploadRoute);
app.use('/api/article/category', categoryRoute);
app.use('/api/article', articleRoute);
// swagger路由
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
  console.error('err.name:', err.name);
  console.error('err.msg:', err.message);
  if (err.name === 'UnauthorizedError') {
    res.send(new ForbiddenError('权限不足').toResponseJson());
  } else if (err instanceof ServiceError) {
    // 捕获到自定义错误类
    res.send(err.toResponseJson());
  } else {
    res.send(new UnknownError().toResponseJson());
  }
});

module.exports = app;
