"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * in运算符
 * 确定对象中是否包含某个属性名
 *
 */
var obj = {
    a: 1
};
console.log('a' in obj);
function isFish(pet) {
    return pet.swim !== undefined;
}
var yu = {
    name: '小鱼',
    swim: function () { }
};
