import { head } from 'shelljs'
import { isPlainObject } from './util'

export function processHeaders(headers: any, data: any) {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}

/**
 * header对象的key标准化(输入小写/大写，最终都转为大写)
 * @param headers
 * @param normalizedName
 */
function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(keyName => {
    if (
      keyName !== normalizedName &&
      keyName.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[keyName]
      delete headers[keyName]
    }
  })
}
