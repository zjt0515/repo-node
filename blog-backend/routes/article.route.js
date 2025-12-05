const express = require('express');
const {
  addArticleService,
  updateArticleService,
  deleteArticleService,
  getArticleService,
  getArticlesService
} = require('../service/article.service');
const router = express.Router();
const Category = require('../dao/model/article');
const { ServiceError } = require('../utils/ServiceError');
const { ValidationError } = require('sequelize');
const { body } = require('express-validator');

const existingCategoryId = async function (id) {
  const existingId = await Category.findByPk(value);
  if (existingId == null) {
    throw new ValidationError('分类不存在');
  }
};
// add
router.post(
  '/',
  body('categoryId').optional().custom(existingCategoryId),
  async function (req, res) {
    res.send(await addArticleService(req.body));
  }
);

// update
router.put('/:id', async function (req, res) {
  res.send(await updateArticleService(req.params.id, req.body));
});

// delete
router.delete('/:id', async function (req, res) {
  res.send(await deleteArticleService(req.params.id));
});

// getOne
router.get('/:id', async function (req, res) {
  res.send(await getArticleService(req.params.id));
});

// getAll
router.get('/', async function (req, res) {
  res.send(await getArticlesService());
});

module.exports = router;
