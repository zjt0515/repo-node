"use strict";
/**
 * 泛型约束
 */
var Order = /** @class */ (function () {
    function Order() {
    }
    Order.prototype.printOrd = function () { };
    Order.getCount = function () { return Order.count; };
    return Order;
}());
// type OrdInstance = 
/**
 * 函数中的泛型约束
 *
 * 比较a的length属性和b的length值大小
 * @param a
 * @param b
 */
function comp(a, b) {
    return a.length >= b.length;
}
console.log(comp([1, 2], [1, 2, 3])); // 正确
console.log(comp('ab', 'abc')); // 正确
/**
 * vue源码中的泛型约束
 */
