const path = require('path');
const { extractFilesByExts } = require('./findFiles');

const src = '/Volumes/新加卷/BaiduNetdiskDownload/Vim键盘侠训练营';
// getFilesNameByExts('/Volumes/新加卷/BaiduNetdiskDownload', ['.pdf', '.mp4']);

// getFilesNameByExts(path.join(__dirname, '../public'), ['.html']);

extractFilesByExts(src, ['.pdf', '.mp4']);
