const express = require('express');
const { formatResponse } = require('../utils/utils');
const {
  getBannerService,
  addBannerService,
  updateBannerService,
  deleteBannerService
} = require('../service/banner.service');
const router = express.Router();

// get
router.get('/', async function (req, res) {
  res.send(formatResponse(0, '', await getBannerService()));
});

// add
router.post('/', async function (req, res) {
  res.send(formatResponse(0, '', await addBannerService(req.body)));
});

// update
router.put('/', async function (req, res) {
  res.send(formatResponse(0, '', await updateBannerService(req.body)));
});

// delete
router.delete('/', async function (req, res) {
  res.send(formatResponse(0, '', await deleteBannerService(req.body)));
});

module.exports = router;
