import Axios from './core/Axios'
import { extend } from './helpers/util'
import { AxiosInstance } from './types/index'
function createInstance(): AxiosInstance {
  const context = new Axios()
  // instance本身是一个context上下文执行的request方法
  const instance = Axios.prototype.request.bind(context)

  // 将实例的原型属性和实例属性都拷贝到混合对象上
  extend(instance, context)

  return instance as AxiosInstance
}
const axios = createInstance()
export default axios
