const express = require('express');
const {
  addExampleService,
  updateExampleService,
  deleteExampleService,
  getExampleService,
  getExamplesService
} = require('../service/example.service');
const router = express.Router();

// add
router.post('/', async function (req, res) {
  res.send(await addExampleService(req.body));
});

// update
router.put('/:id', async function (req, res) {
  res.send(await updateExampleService(req.params.id, req.body));
});

// delete
router.delete('/:id', async function (req, res) {
  res.send(await deleteExampleService(req.params.id));
});

// getOne
router.get('/:id', async function (req, res) {
  res.send(await getExampleService(req.params.id));
});

// getAll
router.get('/', async function (req, res) {
  res.send(await getExamplesService());
});

module.exports = router;
