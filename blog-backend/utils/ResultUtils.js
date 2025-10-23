class ResultUtils {
  static success(data) {
    return new BaseResponse(0, 'ok', data);
  }
}
