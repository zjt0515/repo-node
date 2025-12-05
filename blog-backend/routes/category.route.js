const express = require('express');
const {
  addCategoryService,
  updateCategoryService,
  deleteCategoryService,
  getCategoriesService,
  getCategoryService
} = require('../service/category.service');
const { formatResponse } = require('../utils/utils');
const { param, body, validationResult } = require('express-validator');
const { ValidationError } = require('sequelize');

const router = express.Router();
/**
 * @Route articleCategoryRoute
 */
// add
router.post(
  '/',
  body('name').exists().isString(),
  async function (req, res, next) {
    const validation = validationResult(req);
    console.log(validation);
    if (!validation.isEmpty()) {
      res.send(new ValidationError('参数错误').toResponseJson());
    } else {
      res.send(await addCategoryService(req.body));
    }
  }
);

// update
router.put(
  '/:id',
  param('id').exists().isString(),
  body('name').exists().isString(),
  async function (req, res) {
    res.send(await updateCategoryService(req.params.id, req.body));
  }
);

// delete
router.delete(
  '/:id',
  param('id').exists().isString(),
  async function (req, res) {
    res.send(await deleteCategoryService(req.params.id));
  }
);

// findAll
router.get('/', async function (req, res) {
  res.send(await getCategoriesService());
});

// findOne
router.get('/:id', param('id').exists().isString(), async function (req, res) {
  res.send(await getCategoryService(req.params.id));
});

module.exports = router;
