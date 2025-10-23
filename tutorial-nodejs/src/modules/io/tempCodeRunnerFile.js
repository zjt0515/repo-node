var fs = require('fs')
var path = require('path')
filename = path.resolve(__dirname, './testCopy.txt')
fs.stat(filename, (err, stats) => {
  console.log(stats)
})