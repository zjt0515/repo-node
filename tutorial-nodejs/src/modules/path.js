const path = require('path')

console.log(`文件名: ${path.basename('/foo/bar.js', '.js')}`)
console.log(`目录名: ${path.dirname('/path/index')}`)
console.log(`后缀名: ${path.extname('/path/index.js')}`)
// 路径拼接
console.log(`路径拼接: ${path.join('a', 'b', 'd', '../', 'c.js')}`)
console.log(`路径规范化: ${path.normalize('O:\\1\\2\\..\\')}`)
console.log(`获取相对路径: ${path.relative('1/2/3', '1/2/4/6')}`)
console.log(`获取绝对路径: ${path.resolve('a.js')}`)
console.log(`获取绝对路径: ${path.resolve('/1/2')}`)
// 相对命令行 process.cwd()
console.log(`获取绝对路径: ${path.resolve('./test.js')}`)

console.log(`路径分隔符: ${path.sep}`)
console.log(`块分隔符: ${path.delimiter}`)
