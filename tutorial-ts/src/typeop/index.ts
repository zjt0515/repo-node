type MyObj = {
  name: string
  age: number
}
type Keys = keyof MyObj

// * =================== Section: in ===================
/**
 * 1. 确定对象中是否包含某个属性名
 */
const obj = {
  a: 1,
}
console.log('a' in obj)

// 2. 遍历联合类型
type Union = 'a' | 'b' | 'c'
type MyUnion = {
  [Prop in Union]: number
}

// * =================== Section: is ===================
/**
 * is
 * 描述函数返回类型
 */
interface Fish {
  name: string
  swim: () => void
}
interface Bird {
  name: string
  fly: () => void
}
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined
}
let yu: Fish = {
  name: '小鱼',
  swim: () => {},
}
export {}

// * =================== Section: extends 条件类型 ===================
//
interface Lineup {
  map: string
  image: string
}

type newPropToObj<T, K extends string, V> = {
  [prop in keyof T | K]: prop extends keyof T ? T[prop] : V
}

type TestLineup = newPropToObj<Lineup, 'type', string>

// # 扁平模块化属性名
type ModuleType<T, U> = `${T & string}/${U & string}`
type chiselModule = ModuleType<'chisel', 'ui' | 'playground' | 'editor'>
type chieslUIModule = ModuleType<'chisel', 'ui'>

type MethodsType = {
  menu: {
    setActive: (index: string) => void
  }
  tabs: {
    setActive: (index: string) => void
    deleteFile: (index: string) => boolean
  }
}

type ModuleSpliceKey<T> = {
  [p in keyof T]: ModuleType<p, keyof T[p]>
}[keyof T] // 舍弃key，联合value!

type test = ModuleSpliceKey<MethodsType>
