'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var http = require('http')
var url = require('url')
// * =================== Section: 搭建server ===================
var server = http.createServer(function (request, response) {
  console.log('request: ')
  console.log(request)
  console.log('\u8BF7\u6C42\u5730\u5740: '.concat(request.url))
  // response
  console.log('response:')
  console.log(response)
  // 设置消息头
  response.setHeader('a', 1)
  // 设置响应体
  response.write('hello')
  // 状态码
  response.statusCode = 404
  response.end()
})
server.listen(9537)
server.on('listening', function () {
  console.log('server listening on 9527')
})
