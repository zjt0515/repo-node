"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var People = /** @class */ (function () {
    function People(_name, _age, _addr) {
        this._age = 0;
        this.name = _name;
        this.addr = _addr;
        People.count++;
    }
    Object.defineProperty(People.prototype, "age", {
        get: function () {
            return this._age;
        },
        set: function (val) {
            if (val >= 0 && val <= 150) {
                this._age = val;
            }
            else {
                throw new Error('年龄不在范围内');
            }
        },
        enumerable: false,
        configurable: true
    });
    // 会保存在原型对象中
    People.prototype.doEat = function () {
        console.log("eating");
    };
    // 静态方法：工具类
    People.Check = function () { };
    // 静态属性
    People.count = 0;
    return People;
}());
var p = new People("zjt", 13);
