const os = require('os')

console.log(os.EOL)
console.log(os.arch())
console.log(os.cpus())

console.log(`空闲内存: ${os.freemem() / 1024 / 1024}MB`)
console.log(`主机名: ${os.hostname()}`)
console.log(`homedir: ${os.homedir()}`)
console.log(`tmpdir: ${os.tmpdir()}`)
