/**
 * 业务响应基类
 */
class BaseResponse {
  /**
   *
   * @param {*} code 响应码
   * @param {*} msg 响应消息
   * @param {*} data 响应数据
   */
  constructor(code, msg, data) {
    this.msg = msg;
    this.code = code;
    this.data = data;
  }
}
module.exports = BaseResponse;
