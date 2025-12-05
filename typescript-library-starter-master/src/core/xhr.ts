import { createError } from '../helpers/error'
import { parseHeaders } from '../helpers/header'
import { AxiosPromise, AxiosRequestConfig } from '../types'
import { AxiosResponse } from '../types/index'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = 'get',
      headers,
      responseType,
      timeout
    } = config

    // * =================== Section: request初始化 ===================

    const request = new XMLHttpRequest()

    if (responseType) {
      request.responseType = responseType
    }

    if (timeout) {
      request.timeout = timeout
    }

    request.open(method.toUpperCase(), url!, true)

    // * =================== Section: 监听事件 ===================

    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())

      const responseData =
        responseType !== 'text' ? request.response : request.responseText

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      // resolve(response)
      // 状态码为2xx时resolve
      handleResponse(response)
    }

    // 处理网络错误
    request.onerror = function handleError() {
      // reject(new Error('Network Error'))
      reject(createError('Network Error', config, null, request))
    }

    // 处理超时
    request.ontimeout = function handleTimeout() {
      // reject(new Error(`Timeout of ${timeout} ms exceeded`))
      reject(
        createError(
          `Timeout of ${timeout} ms exceeded`,
          config,
          'ECONNABORTED',
          request
        )
      )
    }

    // 设置请求头
    Object.keys(headers).forEach(key => {
      if (data === null && key.toLowerCase() === 'content-type') {
        // 没有数据时content-type无意义
        delete headers[key]
      } else {
        request.setRequestHeader(key, headers[key])
      }
    })
    // * =================== Section: request发送 ===================

    request.send(data)

    // * =================== Section: 辅助方法 ===================

    function handleResponse(response: AxiosResponse): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed with status code ${response.status}`))
        reject(
          createError(
            `Request failed with status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
