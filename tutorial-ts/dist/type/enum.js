"use strict";
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
var Direction;
(function (Direction) {
    // 自动增长
    Direction[Direction["UP"] = 1] = "UP";
    Direction[Direction["DOWN"] = 2] = "DOWN";
    Direction[Direction["LEFT"] = 3] = "LEFT";
    Direction[Direction["RIGHT"] = 4] = "RIGHT";
})(Direction || (Direction = {}));
// 值从0开始自动增长
var Block;
(function (Block) {
    Block[Block["STONE"] = 0] = "STONE";
    Block[Block["GLASS"] = 1] = "GLASS";
})(Block || (Block = {}));
/**
 * 字符串枚举
 */
var StringDirection;
(function (StringDirection) {
    StringDirection["UP"] = "UP";
    StringDirection["DOWN"] = "DOWN";
})(StringDirection || (StringDirection = {}));
// 字符串取值
StringDirection.UP;
StringDirection['DOWN'];
var classromm = {
    direction: Direction.DOWN,
};
/**
 * 数字枚举
 * 反向映射 value -> key
 */
var Type;
(function (Type) {
    Type[Type["success"] = 0] = "success";
    Type[Type["fail"] = 1] = "fail";
})(Type || (Type = {}));
var key = Type[0];
console.log(typeof key + ':' + key);
/**
 * enum底层
 */
