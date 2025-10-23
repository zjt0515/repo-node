// 静态资源服务器
// http://localhost:9537/index.html -> public/index.html
// .../css/inedx.css -> public/css/index.css
const HTTP = require('http')
const URL = require('url')
const PATH = require('path')
const FS = require('fs')

const port = 6001

const server = HTTP.createServer(requestListener)

server.listen(port)

server.on('listening', () => {
  console.log(`server listening on ${port}`)
})

async function requestListener(req, res) {
  const filename = await getFilename(req.url)
  if (filename) {
    const buffer = await FS.promises.readFile(filename)
    res.write(buffer.toString('utf-8'))
    res.statusCode = 200
  } else {
    res.statusCode = 404
    res.write('Rousource Not Found')
  }
  res.end()
}

/**
 * 网址 -> 文件路径
 * @param {*} url
 */
async function getFilename(url) {
  const urlObj = URL.parse(url)

  const pathname = '.' + urlObj.pathname

  let filename = PATH.resolve(__dirname, 'public', pathname)
  console.log(filename)

  let fileStat = await getFileStat(filename)
  console.log(fileStat)
  if (!fileStat) {
    console.log('页面不存在')
    return null
  } else if (fileStat.isDirectory()) {
    console.log('是目录')

    // 访问目录
    filename = PATH.resolve(__dirname, 'pulic', pathname, './index.html')
    fileStat = await getFileStat(filename)
    if (!fileStat) {
      return null
    }
  }
  return filename
}

async function getFileStat(filename) {
  try {
    return await FS.promises.stat(filename)
  } catch {
    return null
  }
}
