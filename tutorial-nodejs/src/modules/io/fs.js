var fs = require('fs')
var path = require('path')

// 绝对路径
let filename = path.resolve(__dirname, './test.txt')
console.log(filename)

async function test1() {
  const res = await fs.promises.readFile(filename, 'utf-8')
}

// * =================== Section: 读取 ===================

fs.readFile(filename, (err, data) => {
  console.log(data.toString('utf-8'))
})
fs.readFile(filename, 'utf-8', (err, data) => {
  console.log(data)
})

// * =================== Section: 写入 ===================

async function write(data) {
  await fs.promises.writeFile(filename, data, {
    flag: 'a',
  })
}
let data = '写入字符串'
write(data)
data = Buffer.from('abcde', 'utf-8')
write(data)

// * =================== Section: 文件信息 ===================
var fs = require('fs')
var path = require('path')
filename = path.resolve(__dirname, './testCopy.txt')
fs.stat(filename, (err, stats) => {
  console.log(stats)
})

// % =================== Section: 练习题 ===================
var fs = require('fs')
var path = require('path')
/**
 * 复制文件实现
 * @param {*} absFilename
 */
async function myCopyFile(absFilename) {
  // 读取
  const buffer = await fs.promises.readFile(absFilename)
  // 构造新文件的绝对路径
  const ext = path.extname(absFilename)
  const newBasename = `${path.basename(absFilename, ext)}.copy${ext}`
  const newAbsFilename = path.resolve(__dirname, newBasename)

  await fs.promises.writeFile(newAbsFilename, buffer)
  console.log('copy success')
}
filename = path.resolve(__dirname, './testCopy.txt')
myCopyFile(filename)
