"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// 参数、返回值定义，以及默认值、可选参数
function add(a, b) {
    if (b === void 0) { b = 0; }
    return a + b;
}
var minus = function (a, b) {
    if (!b)
        return a;
    return a - b;
};
var multi = function (a, b) {
    return a + b;
};
function subInfo(_a) {
    var name = _a.name;
    console.log(name);
}
var MessageType;
(function (MessageType) {
    MessageType["IMAGE"] = "IMAGE";
    MessageType["AUDIO"] = "AUDIO";
})(MessageType || (MessageType = {}));
var messages = [
    {
        id: 1,
        type: MessageType.IMAGE,
        sendMessage: "想你了"
    },
    {
        id: 2,
        type: MessageType.AUDIO,
        sendMessage: "123"
    }
];
/**
 * 在单个函数中实现按多种类型搜索
 * 问题：
 * 1. 返回类型多，可读性差
 * 2. 因为返回类型多，使用时还需要类型断言，增加bug风险，读起来也不优雅
 */
function searchMessage(condition) {
    console.log(typeof condition);
    if (typeof condition === "number") {
        return messages.find(function (msg) { return msg.id === condition; });
    }
    else {
        return messages.filter(function (msg) { return msg.type === condition; });
    }
}
function searchMessage2(condition) {
    if (typeof condition === "number") {
        return messages.find(function (msg) { return msg.id === condition; });
    }
    else {
        return messages.filter(function (msg) { return msg.type === condition; });
    }
}
// 使用时可以根据参数推断出返回类型 
console.log((_a = searchMessage2(1)) === null || _a === void 0 ? void 0 : _a.type);
console.log(searchMessage2(MessageType.AUDIO));
