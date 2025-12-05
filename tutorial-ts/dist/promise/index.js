"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Promise = void 0;
var Promise = /** @class */ (function () {
    function Promise(executor) {
        var _this = this;
        this.status = 'pending';
        this.resolve = function (value) {
            if (_this.status === 'pending') {
                _this.status = 'fulfilled';
                // 模拟resolve中途出错
                value[10] = 100;
                _this.resolvedValue = value;
            }
        };
        this.reject = function (reason) {
            if (_this.status === 'pending') {
                _this.status = 'rejected';
                _this.rejectedReason = reason;
            }
        };
        // 执行executor, 同时向外传递俩函数
        try {
            executor(this.resolve, this.reject);
        }
        catch (error) {
            // this.reject(error.toSting())
        }
    }
    Promise.prototype.then = function (resolveInThen, rejectInThen) {
        if (this.status === 'fulfilled') {
            resolveInThen(this.resolvedValue);
        }
        else if (this.status === 'rejected') {
            rejectInThen(this.rejectedReason);
        }
    };
    return Promise;
}());
exports.Promise = Promise;
