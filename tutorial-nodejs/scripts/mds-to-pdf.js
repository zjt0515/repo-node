const path = require('path');
const fs = require('fs');
// var markdownpdf = require('markdown-pdf');
const { getFilesByExts: getFilesNameByExts } = require('./findFiles');

// var mdDocs = ['chapter1.md', 'chapter2.md', 'chapter3.md'],
//   bookPath = '/path/to/book.pdf';

// markdownpdf()
//   .concat.from(mdDocs)
//   .to(bookPath, function () {
//     console.log('Created', bookPath);
//   });

const src = path.join(__dirname, '../resources/web-interview/docs/');

(async function () {
  const fileNames = await getFilesNameByExts(src, ['.md']);
  console.log(fileNames);
})();
