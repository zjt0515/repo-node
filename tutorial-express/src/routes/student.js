const express = require('express');
const stuRouter = express.Router();

app.use('/api/stu', stuRouter);

stuRouter.get('/', (req, res) => {
  console.log('get all stu');
});
stuRouter.get('/:id', (req, res) => {
  console.log('get stu byId');
});
stuRouter.post('/', (req, res) => {
  res.send('add stu');
});
stuRouter.put('/:id', (req, res) => {
  res.send('update stu');
});
stuRouter.delete('/', (req, res) => {
  res.send('delete stu');
});
