// * =================== Section: generic ===================
type Status<T> = 'success' | 'failure' | 'pending' | T

// 函数作用的type，泛型充当参数
type CompleteStatus = Status<'offline'>

// * =================== Section: 函数和泛型 ===================
function factory<T>(input: T) {
  return input
}

// 多个泛型参数
function moreFactories<T, F>(input1: T, input2: F) {
  if (Math.random() < 0.5) return input1
  else return input2
}

// * =================== Section: 类和泛型 ===================
/**
 * 默认泛型为any¡™
 */
class MyArrayList<T = any> {
  array: Array<T>
  index: number = 0
  constructor() {
    this.array = []
  }
  /**
   * 增
   * @param data
   */
  add(data: T) {
    this.array[this.index++] = data
  }
  /**
   * 通过索引取值
   * @param data
   */
  get(index: number) {
    return this.array[index]
  }
}
