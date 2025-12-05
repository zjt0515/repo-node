const express = require('express');
const { UploadError } = require('../utils/ServiceError');
const { upload } = require('../utils/upload');
const router = express.Router();
const multer = require('multer');

// get
router.get('/', async function (req, res) {});

// 上传头像
router.post('/avatar', async function (req, res, next) {
  upload.single('avatar')(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // 发生错误
      // next(new UploadError('上传错误, 文件超出大小'));
      res.send(new UploadError('上传错误, 文件超出大小'));
    } else if (err) {
      // 发生错误
    }
  });
});

// add
router.post('/', async function (req, res) {});
// update
router.put('/', async function (req, res) {});
// delete
router.delete('/', async function (req, res) {});

module.exports = router;
