const express = require('express')

const app = express()

const  singer = require('./dev-data/data/singer.json')

// routes
app.get('/', (req, res) => {
  // res.status(200).send('Hello from server')
  res.status(200).json({message: 'Hello', app: 'Natours'})
})

app.post('/user/add', (req, res)=>{
  res.send('add a user ')
})

// 获取请求报文参数
app.get('/request', (req, res)=>{
  // 原生
  console.log(req.method)
  console.log(req.url)
  console.log(req.httpVersion)
  console.log(req.headers)

  // express
  console.log(req.path)
  console.log(req.query)
  console.log(req.ip)
  console.log(req.get('host'))

  res.end('get success')
})

// 路由参数解析
app.get('/:itemId', (req, res) => {
  // 根据参数访问数据库
  console.log(req.params.itemId)
  // 返回结果
  res.setHeader('content-type', 'text/html;charset=utf-8')
  res.end('详情页面')
})

// 歌手详情页
app.get('/singer/:id', (req, res) => {
  res.end(singer.filter((singer) =>  singer.id === req.params.id)[0].name)
})


const port = 3000
app.listen(port, ()  => {
  console.log(`App running on port: ${port}`)
})