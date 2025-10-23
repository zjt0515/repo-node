module.exports = (req, res, next) => {
  if (req.headers['content-type'] === '') {
    let result = '';
    req.on('data', chunk => {
      result += chunk.toString('utf-8');
    });

    req.on('end', () => {
      res.body = result;
      next();
    });
  } else {
    next();
  }
};
