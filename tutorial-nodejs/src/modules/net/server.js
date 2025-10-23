// * =================== Section: Server ===================
const net = require('net')
const path = require('path')
const fs = require('fs')

const server = net.createServer(connectionHandler)

// server开始监听
server.listen(9527)

// 监听server的事件
server.on('listening', () => {
  console.log('the server starts listening...')
})

server.on('connection', (socket) => {
  console.log('a client is connecting...')

  socket.on('data', async (request) => {
    console.log(request.toString('utf-8'))
    // 读取本地文件
    const filename = path.resolve(__dirname, '../../../public/index.html')

    const bodyBuffer = await fs.promises.readFile(filename)
    const headBuffer = Buffer.from(`HTTP/1.1 200 OK

`)

    const resultBuffer = Buffer.concat([headBuffer, bodyBuffer])
    // 发送响应
    socket.write(resultBuffer)

    socket.end()
  })

  socket.on('end', () => {
    console.log('连接关闭')
  })
})

function connectionHandler() {}
