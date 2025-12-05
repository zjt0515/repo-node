/**
 * js实现
 */
// const Color = {
//     RED: 0,
//     BLUE: 1,
//     GREEN: 2
// }
/**
 * 数字枚举
 */
enum Direction {
  // 自动增长
  UP = 1,
  DOWN,
  LEFT,
  RIGHT,
}
// 值从0开始自动增长
enum Block {
  STONE,
  GLASS,
}
/**
 * 字符串枚举
 */
enum StringDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}
// 字符串取值
StringDirection.UP
StringDirection['DOWN']
// 字符串枚举，没有反向取值

/**
 * const枚举
 * 编译后为常量
 */
const enum ConstEnmu {
  test = 1,
}

/**
 * 接口中使用枚举
 */
interface Place {
  direction: Direction
}

let classromm: Place = {
  direction: Direction.DOWN,
}

/**
 * 数字枚举
 * 反向映射 value -> key
 */
enum Type {
  success,
  fail,
}
let key = Type[0]
console.log(typeof key + ':' + key)

/**
 * enum底层
 */
