"use strict";
// tsc --init
// tsc -w 编译为js文件，然后node运行js
// npm i ts-node -g
// npm init -y
// tsc -w 编译为js npm i @types/node -D
// ts-node index.ts 直接调试
// * =================== Section: 基础类型 ===================
// string
{
    var name_1 = 'zjt';
    var hello = "1\n2\n3";
    console.log(hello);
}
// number 浮点数
var binary = 14;
var octal = 15;
var decimal = 15;
var hex = 0x0f;
var inf = Infinity;
// boolean
var bool1 = true;
var bool2 = false;
// array
var list1 = [1, 2, 3];
var list2 = [1, 2];
// void, null, undefined
// let n:void = null
// undefined
var canEqualUndefined1 = undefined;
var canEqualUndefined2 = undefined;
var canEqualUndefined3 = undefined;
// null
var canEqualNull1 = null;
var canEqualNull2 = null;
var canEqualNull3 = null;
/**
 * 顶级类型 any, unknown更安全
 * 不确定一个类型，优先使用unknown
 * unknown不能赋给除了unknown和自身的变量
 * unkown不能访问自身的方法和属性
 */
var a = { name: 'a' };
var b = a;
var c = a;
// let d:Number = a
// a.name
/**
 * Object类型，{}
 */
var O = 'str';
var O2 = 'str';
var O3 = { name: 'zjt' };
/**
 * object类型
 * 可以赋值引用类型，不能是基本类型
 */
var o = [1, 2, 3];
/**
 * Number String
 */
/**
 * number string
 */
/**
 * 特殊类型
 */
// tuple
console.log('=========tuple=========');
var salary = ['zjt', 10000, 5000, 15000];
// 可变tuple
var salary2 = ['zjt', 1, 1, 1, 1, 1, 1, 1];
// 解构
var name3 = salary2[0], nuber1 = salary2[1], rest = salary2.slice(2);
// 元祖标签tag
console.log(salary2[0]);
var tagedTuple = ['zjt', 111, 222];
function useDataFlow(dataFlow) {
    if (typeof dataFlow === 'string') {
        dataFlow.length;
    }
    else if (typeof dataFlow === 'number') {
        dataFlow.toFixed(2);
    }
    else {
        // never类型，暂时不可能到达的地方
        // 如果未来新增了数据类型，这里就是预留的区域
        var data = dataFlow;
    }
}
/**
 * 合成类型
 */
// 联合类型
var StrOrNum = 'str';
StrOrNum = 1;
console.log(StrOrNum);
// 交叉类型
var obj = { username: 'zjt', age: 18 };
console.log(obj);
var num = 2;
/**
 * 经典报错
 */
// 不能使用 不固定的索引值
var user = { name: 'zjt' };
// let need = 'name'
var need = 'name';
var username = user[need];
// object类型不能使用常量索引
var objtest = { name: 'zjt' };
// let username2 = objtest[need]
