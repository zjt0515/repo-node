// error -> catch -> throw new ServiceError(403, "..")

const { CodeEnum } = require('../enums');
const { formatResponse } = require('./utils');

/**
 * 业务响应基类
 */
class ServiceError extends Error {
  /**
   *
   * @param {*} code 错误消息码
   * @param {*} msg 错误消息
   */
  constructor(code, msg) {
    super(msg);
    this.code = code;
  }

  toResponseJson() {
    return formatResponse(this.code, this.msg);
  }
}

// 文件上传错误类
exports.UploadError = class extends ServiceError {
  constructor(msg) {
    super(413, msg);
  }
};
// 禁止访问错误类
exports.ForbiddenError = class extends ServiceError {
  constructor(msg) {
    super(CodeEnum.FORBIDDEN, msg);
  }
};
// 验证错误
exports.ValidationError = class extends ServiceError {
  constructor(msg) {
    super(CodeEnum.UNAUTHORIZED, msg);
  }
};
// 无资源错误
exports.NotFoundError = class extends ServiceError {
  constructor() {
    super(CodeEnum.NOT_FOUND, 'not found');
  }
};
// 未知错误
exports.UnknownError = class extends ServiceError {
  constructor() {
    super(500, 'server internal error');
  }
};

module.exports.ServiceError = ServiceError;
