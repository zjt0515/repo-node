// tsc --init
// tsc -w 编译为js文件，然后node运行js
// npm i ts-node -g
// npm init -y
// tsc -w 编译为js npm i @types/node -D
// ts-node index.ts 直接调试

// * =================== Section: 基础类型 ===================
// string
{
  let name: string = 'zjt'
  let hello: string = `1
2
3`
  console.log(hello)
}

// number 浮点数
let binary: number = 0b1110
let octal: number = 0o17
let decimal: number = 15
let hex: number = 0x0f
let inf: number = Infinity

// boolean
let bool1: boolean = true
let bool2: boolean = false

// array
let list1: number[] = [1, 2, 3]
let list2: Array<number> = [1, 2]

// void, null, undefined
// let n:void = null

// undefined
let canEqualUndefined1: any = undefined
let canEqualUndefined2: undefined = undefined
let canEqualUndefined3: unknown = undefined

// null
let canEqualNull1: any = null
let canEqualNull2: null = null
let canEqualNull3: unknown = null

/**
 * 顶级类型 any, unknown更安全
 * 不确定一个类型，优先使用unknown
 * unknown不能赋给除了unknown和自身的变量
 * unkown不能访问自身的方法和属性
 */
let a: unknown = { name: 'a' }
let b: any = a
let c: unknown = a
// let d:Number = a
// a.name

/**
 * Object类型，{}
 */
let O: Object = 'str'
let O2: {} = 'str'
let O3: {} = { name: 'zjt' }

/**
 * object类型
 * 可以赋值引用类型，不能是基本类型
 */
let o: object = [1, 2, 3]

/**
 * Number String
 */

/**
 * number string
 */

// * =================== Section: 特殊类型 ===================
// tuple
let salary: [string, number, number, number] = ['zjt', 10000, 5000, 15000]

// 可变tuple
let salary2: [string, number, ...any[]] = ['zjt', 1, 1, 1, 1, 1, 1, 1]
// 解构
let [name3, nuber1, ...rest] = salary2
// 元祖标签tag
console.log(salary2[0])
let tagedTuple: [name: string, salary1: number, salary2: number] = ['zjt', 111, 222]

/**
 * never
 */
type DataFlowType = string | number
function useDataFlow(dataFlow: DataFlowType) {
  if (typeof dataFlow === 'string') {
    dataFlow.length
  } else if (typeof dataFlow === 'number') {
    dataFlow.toFixed(2)
  } else {
    // never类型，暂时不可能到达的地方
    // 如果未来新增了数据类型，这里就是预留的区域
    let data = dataFlow
  }
}

{
  let unknown: unknown = '2'
  let any: any = '1'
  let number: number = 1
  // number = unknown
  number = any
}

/**
 * 合成类型
 */

// 联合类型 A | B
let StrOrNum: string | number = 'str'
StrOrNum = 1
console.log(StrOrNum)

// 交叉类型 A & B
let obj: { username: string } & { age: number } = { username: 'zjt', age: 18 }
console.log(typeof obj)

/**
 * 字面量数据类型
 */
type A = 1 | 2 | 3 | 4 | 5
let num: A = 2

/**
 * 经典报错
 */
// 不能使用 不固定的索引值
let user = { name: 'zjt' }
// let need = 'name'
const need = 'name'
let username = user[need]

// object类型不能使用常量索引
let objtest: object = { name: 'zjt' }
// let username2 = objtest[need]
