// * =================== Section: keyof ===================
/**
 * keyof获取接口属性 -> key的联合类型
 */
interface MyProduct2 {
  name: string
  price: number
  account: number
  buy(): string
}
// keyof 类型，typeof 变量
type PKeys = keyof MyProduct2
// 等同于：
type PKeys2 = 'name' | 'price' | 'account' | 'buy'

// 但是不会直接显示，可以写一个工具type
type DirectKeys<T> = T extends any ? T : never
type testPKeys = DirectKeys<keyof MyProduct2>

/**
 *
 */
type AllKeys<T> = T extends any ? T : never
type Pkeys3 = AllKeys<keyof MyProduct2>

let pKeys: PKeys = 'buy'

/**
 * keyof获取类属性
 */
class Student {
  name: string
  score: number = 0
  static count = 0
  constructor(name: string) {
    this.name = name
    Student.count++
  }
}
type StudentProps = keyof Student
let test1: StudentProps = 'name'
let test2: StudentProps = 'score'
// let test3:StudentProps =  "price"
// let test4:StudentProps =  "count"

type Readonly<T> = {
  readonly [P in keyof T]: T[P]
}

// * =================== Section: infer ===================
interface Worker {
  name: string
  age: number
}
type work = (worker: Worker) => number

// type workParaType = work extends (params: infer P) => any ? P : never
type workReturnType = work extends (params: any) => infer R ? R : never
type ParaType<F> = F extends (params: infer P) => any ? P : never

type workParaType = ParaType<work>

// # 作业
class Subject {
  constructor(public id: number, public name: string) {}
}
let chinese = new Subject(1, 'chinese')
let subjectSet = new Set([chinese])

// type getSetEleType = subjectSet extends Set<infer E> ? E : never
type getEleType<T> = T extends Set<infer E> ? E : unknown
type test = getEleType<subjectSet>

// vue源码 infer
function isRef(ref: any) {
  return true
}
interface Ref<T> {
  value: T
}
export function unref<T>(ref: T): T extends Ref<infer V> ? V : T {
  return isRef(ref) ? (ref.value as any) : ref
}

// * =================== Section: in keyof ===================
interface Customer {
  name: string
  phone: number
}

type Copy<T> = {
  // 迭代
  [P in keyof T]: T[P]
}

type copyCustomer = Copy<Customer>

// * =================== Section: in  ===================
