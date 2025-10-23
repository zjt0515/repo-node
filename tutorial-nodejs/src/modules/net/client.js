const net = require('net')
// * =================== Section: Client ===================

var cnt = 0
var contentLen = 0
var currentLen = 0
let responseObj = {}
const socket = net.createConnection(
  {
    host: 'docs.videoroll.app',
    port: 80,
  },
  () => {
    console.log('连接成功')
  }
)

// 监听socket事件: data
socket.on('data', (data) => {
  // 流传输
  console.log(`第${++cnt}次消息`)
  const response = data.toString('utf-8')

  if (cnt === 1) {
    responseObj = parseResponse(response)

    contentLen = responseObj['Content-Length']
  } else {
    responseObj.body += response
  }
  currentLen = Buffer.from(responseObj.body, 'utf-8').byteLength
  // 结束socket, 断开连接
  if (currentLen >= contentLen) {
    console.log(`当前接收${currentLen}, 总计长度${contentLen}`)
    socket.end()
  }
})

socket.write(`GET / HTTP/1.1
Host: docs.videoroll.app
Connection: keep-alive

`)

// 监听关闭
socket.on('close', () => {
  console.log('结束了')
})

// % 辅助函数
function parseResponse(response) {
  const indexOfHeader = response.indexOf('\r\n\r\n')
  console.log('index')
  console.log(indexOfHeader)
  const header = response.substring(0, indexOfHeader)
  // 处理header
  let responseObj = parseHeader(header)

  const body = response.substring(indexOfHeader + 4)
  // 处理body
  console.log('body: ')
  console.log(body)
  responseObj = {
    ...responseObj,
    body,
  }
  console.log('responseObj')
  console.log(responseObj)
  return responseObj
}

/**
 * 将header字符串 转为header对象
 * @param {} header
 */
function parseHeader(header) {
  const headers = header.split('\r\n')
  const headerObj = {}

  for (let i = 0; i < headers.length; i++) {
    if (i === 0) continue
    headerPart = headers[i]
    let headerPartItems = headerPart.split(':')
    headerObj[headerPartItems[0]] = headerPartItems[1].trim()
  }
  return headerObj
}
