const net = require('net')
// * =================== Section: Client ===================
const socket = net.createConnection(
  {
    host: 'baidu.com',
    port: 80,
  },
  () => {
    console.log('连接成功')
  }
)

// 监听socket事件
socket.on('data', (data) => {
  console.log(data)
})

socket.write('testString', () => {})