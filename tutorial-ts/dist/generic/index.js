"use strict";
/**
 * 默认泛型为any
 */
var MyArrayList = /** @class */ (function () {
    function MyArrayList() {
        this.index = 0;
        this.array = [];
    }
    /**
     * 增
     * @param data
     */
    MyArrayList.prototype.add = function (data) {
        this.array[this.index++] = data;
    };
    /**
     * 通过索引取值
     * @param data
     */
    MyArrayList.prototype.get = function (index) {
        return this.array[index];
    };
    return MyArrayList;
}());
