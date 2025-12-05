"use strict";
var DateUtil = /** @class */ (function () {
    function DateUtil() {
    }
    DateUtil.prototype.formatDate = function () { };
    // 立即创建单例
    DateUtil.dateUtil = new DateUtil();
    return DateUtil;
}());
/**
 * 通过调用静态方法来生成(返回)单例
 */
var DateUtil2 = /** @class */ (function () {
    function DateUtil2() {
    }
    DateUtil2.getInstance = function () {
        if (this.dateUtil === null) {
            this.dateUtil = new DateUtil2();
        }
        return this.dateUtil;
    };
    return DateUtil2;
}());
