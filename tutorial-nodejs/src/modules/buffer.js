// * =================== Section: 创建buffer ===================
const buffer = Buffer.from(`我是buffer`, 'utf-8')
console.log(buffer)

// * =================== Section: buffer转string ===================
// Buffer的toString方法
console.log(buffer.toString('utf-8'))
