// * =================== Section: Record ===================
type testRepord1 = Record<string, number>
type testRepord2 = Record<'name' | 'age', number>

function addObj(obj: Record<'name' | 'age', string | number>) {
  console.log(obj)
}
addObj({ name: 'ss', age: 12 })

// 深拷贝，data要考虑obj和[]，还有普通值
type BaseType = string | number | boolean | null | undefined | bigint | symbol

function isPlainObj(data: Record<string, any>) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

function isObj(data: any) {
  return typeof data !== 'object' || data == null
}

function deepCopy(data: Record<string, any> | BaseType) {
  // 不是数组/对象，同时还要包含null
  if (typeof data !== 'object' || data == null) {
    return data
  }
  let result: Record<string, any> = isPlainObj(data) ? {} : []

  for (const key in Object.keys(data)) {
    result[key] = deepCopy(data[key])
  }

  return result
}
// * =================== Section: 综合应用 ===================
interface Todo {
  title: string
  completed: boolean
  desc: string
  add(): number
  delete(): number
  update(): number
}
// 1. 获取Todo中的func
// 2. 用Capitalize将P首字母大写
// 3. 约束泛型：对象
type GetFns<T extends Record<string, any>> = {
  [P in keyof T as T[P] extends Function ? `do${Capitalize<P & string>}` : never]: T[P]
}
// Array -> never
type ExcludeArr<T> = Exclude<T, Array<any>>
type GetFns2<T extends Record<string, any>> = {
  [P in keyof ExcludeArr<T> as ExcludeArr<T>[P] extends Function
    ? `do${Capitalize<P & string>}`
    : never]: ExcludeArr<T>[P]
}

type todoFns = GetFns<Todo>
// how 处理数组
type arrayFns1 = GetFns<Array<any>>
type arrayFns2 = GetFns2<Array<any>>

type Convert<T> = T extends any ? T : never

// 将类中所有属性名和方法的名称 组合成联合类型
type KeyofArray = Convert<keyof Array<any>>
