const https = require('https')
// * =================== Section: 发送请求 ===================
const request = https.request(
  'https://cn.vuejs.org/guide/introduction',
  {
    method: 'GET',
    // 消息体
  },
  (resp) => {
    console.log(`响应码: ${resp.statusCode}`)
    console.log(`响应头: ${resp.headers}`)

    // 响应体使用流的方式读取
    let result = ''
    resp.on('data', (chunk) => {
      result += chunk.toString('utf-8')
    })
    resp.on('end', (chunk) => {
      console.log(result)
    })
  }
)

request.end() // 消息体结束
