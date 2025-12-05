"use strict";
var _a;
/**
 * 创建对象
 */
var p1 = {
    id: 0,
    x: 1,
    y: 2,
    name: 'p1',
    shape: {}
};
/**
 * class implements interface
 */
var PointNode = /** @class */ (function () {
    function PointNode(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.shape = {};
    }
    return PointNode;
}());
var ArrayList = /** @class */ (function () {
    function ArrayList() {
    }
    ArrayList.prototype.add = function () {
        throw new Error("Method not implemented.");
    };
    ArrayList.prototype.remove = function () {
        throw new Error("Method not implemented.");
    };
    return ArrayList;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
    }
    LinkedList.prototype.add = function () {
        throw new Error("Method not implemented.");
    };
    LinkedList.prototype.remove = function () {
        throw new Error("Method not implemented.");
    };
    return LinkedList;
}());
var p = (_a = {
        name: '绯红列赞',
        price: 1078,
        account: 200,
        sell: function () {
            return 10;
        }
    },
    // 测试string
    _a[Symbol("stockno")] = 400,
    _a[100] = 300,
    _a.true = "ok",
    _a);
