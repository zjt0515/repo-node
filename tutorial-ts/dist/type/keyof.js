"use strict";
var pKeys = "buy";
/**
 * keyof获取类属性
 */
var Student = /** @class */ (function () {
    function Student(name) {
        this.score = 0;
        this.name = name;
        Student.count++;
    }
    Student.count = 0;
    return Student;
}());
var test1 = "name";
var test2 = "score";
// let test3:StudentProps =  "price"
// let test4:StudentProps =  "count"
