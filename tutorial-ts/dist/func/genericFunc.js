"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 快排，不改变原数组写法
 * 支持传入各种可以直接比较的元素的数组
 * @param arr
 * @returns
 */
function quickSort(arr) {
    if (arr.length < 2)
        return arr;
    var mid = Math.floor(arr.length / 2);
    var midValue = arr.splice(mid, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        var item = arr[i];
        if (item <= midValue) {
            left.push(item);
        }
        else {
            right.push(item);
        }
    }
    //
    return quickSort(left).concat(midValue, quickSort(right));
}
var test1 = [5, 3, 7, 8, 2, 4, 4, 2, 2, 3, 5];
console.log(quickSort(test1));
var test2 = ["a", "c", "b", "h", "z", "a", "f", "f", "a"];
console.log(quickSort(test2));
/**
 *
 */
var chineseWords = ["在", "被", "从", "啊", "分", "的"];
function ChineseSort(arr) {
    return arr.sort(function (a, b) {
        return a.localeCompare(b, "zh-CN");
    });
}
console.log(ChineseSort(chineseWords));
console.log(chineseWords);
