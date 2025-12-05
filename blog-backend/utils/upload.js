const multer = require('multer');

// 存储引擎
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, path.join(__dirname, '../public/uploads'));
    cb(null, __dirname + '/../public/uploads');
  },
  filename: function (req, file, cb) {
    console.log('file>>', file);
    const newName = file.fieldname + '-' + Date.now();
    cb(null, newName);
  }
});

module.exports.upload = multer({
  storage
  // limits: {
  //   fileSize: 2 * 1024 * 1024,
  //   files: 1
  // }
});

module.exports.uploadAvatar = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024,
    files: 1
  }
}).single('avatar');

// const upload = multer({ dest: 'uploads/' });
