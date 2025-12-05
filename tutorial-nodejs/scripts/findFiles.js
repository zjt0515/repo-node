const path = require('path');
const fs = require('fs');

let matchedFileNum = 0;
const src = path.join(__dirname, '../public');
/**
 * 递归查找指定目录下的特定后缀文件
 * @param {string} src 起始目录绝对路径
 * @param {string|string[]} exts 要匹配的文件后缀（支持单个或多个）
 * @param {string[]} [result=[]] 存放结果的数组
 * @returns {string[]} 返回匹配文件路径数组
 */
function findFilesByExt(src, exts, to) {
  // src路径校验
  if (!fs.existsSync(src)) {
    console.log(`src路径不存在: ${src}`);
    return;
  }
  // to 校验
  to = to || path.join(src, '../Extracted');
  if (!fs.existsSync(to)) {
    console.log(`dest路径不存在: ${to} `);
    return;
  }
  fs.mkdirSync(to);

  // 标准化后缀名为数组（统一小写）
  exts = normalizeExts(exts);

  CopyFileByExt(src, exts, to);

  console.log(`共匹配到上述${matchedFileNum}个文件，已复制到${to}`);
}

/**
 * 从src路径, 寻找特定后缀的文件
 * @param {*} src
 * @param {*} exts
 * @returns [filename1, filename2,...]
 */
exports.getFilesByExts = function (src, exts) {
  // src路径校验
  if (!fs.existsSync(src)) {
    console.warn(`src路径不存在: ${src}`);
    return;
  }

  // 标准化后缀名为数组（统一小写）
  if (exts) {
    exts = normalizeExts(exts);
  } else {
    console.warn('exts未输入');
    return;
  }

  let fileNames = [];
  let fileFullPaths = [];

  // 递归读取文件夹内容
  const files = fs.readdirSync(src, { recursive: true });

  for (const file of files) {
    const ext = path.extname(file);
    // 当前文件/文件夹绝对路径
    const fullPath = path.join(src, file);
    if (ext) {
      // 有后缀名
      if (isExtMatched(ext, exts)) {
        // 后缀匹配成功
        matchedFileNum += 1;
        fileNames.push(file);
        fileFullPaths.push(fullPath);
      }
    }
  }
  return { fileNames, fileFullPaths };
};

/**
 * 提取文件
 * @param {*} src 绝对路径
 * @param {*} exts 后缀名
 * @param {*} to
 */
module.exports.extractFilesByExts = async function (src, exts, to) {
  // to 校验
  to = to || path.join(src, '../Extracted');
  if (fs.existsSync(to)) {
    console.warn('目标路径已存在');
    return;
  } else {
    fs.mkdirSync(to);
  }

  let counts = 0;
  // 读取文件夹内容
  const { fileFullPaths } = exports.getFilesByExts(src, exts);
  for (const fullPath of fileFullPaths) {
    counts++;
    const basename = path.basename(fullPath);
    console.log(basename);
    fs.copyFileSync(fullPath, path.join(to, basename));
  }
  console.log(`成功复制上述${counts}个文件到路径${to}`);
};

// * =================== Section: 辅助方法 ===================
/**
 * EXT -> [ext]
 * @param {*} exts
 * @returns
 */
function normalizeExts(exts) {
  return Array.isArray(exts)
    ? exts.map(e => e.toLowerCase())
    : [exts.toLowerCase()];
}

function isExtMatched(ext, exts) {
  return exts.includes(ext);
}

// 示例：查找当前目录下的所有 .js 和 .ts 文件
// const targetDir = process.argv[2] || process.cwd();
// const targetExts = ['.js', '.ts'];
// const files = findFilesByExtension(targetDir, targetExts);

// console.log(`在 "${targetDir}" 中找到 ${files.length} 个匹配文件:`);
// files.forEach(f => console.log(' -', f));
// findFilesByExt(src, '.html');
