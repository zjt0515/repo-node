console.log(global)

console.log(__dirname)
console.log(__filename)
// * =================== Section: process ===================
console.log(`当前命令行路径: ${process.cwd()}`)
console.log(`命令行参数: ${process.argv}`)
console.log(`当前操作系统: ${process.platform}`)
console.log(`环境变量: ${process.env}`)

console.log(`强制退出node进程: ${process.exit()}`)
console.log(`杀死进程: ${process.kill()}`)
