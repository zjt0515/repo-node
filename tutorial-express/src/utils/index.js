exports.getErrResponse = function (err, errCode) {
  return {
    code: errCode,
    msg: err
  };
};

exports.getDataRespnse = function (data) {
  return {
    code: 0,
    msg: '',
    data
  };
};

/**
 * handler() => return result
 * asyncHandler(handler) =>
 * @param {*} handler
 * @returns
 */
exports.asyncHandler = function (handler) {
  return async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      res.send(exports.getDataRespnse(result));
    } catch (err) {
      next(err);
    }
  };
};
