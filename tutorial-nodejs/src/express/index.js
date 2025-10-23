const express = require('express')
const http = require('http')

const app = express()

// const server = http.createServer(app)
// server.listen(9922, () => {})

app.get('/news/:id', (req, res) => {
  // req
  console.log('请求头', req.headers['host'])
  console.log('请求路径', req.path)
  console.log('请求参数', req.query)
  console.log('动态路由参数', req.params)

  // res
  res.send('<h1>你好</h1>')
  res.setHeader('a', '123')
})

app.listen(6657, () => {})
