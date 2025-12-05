/**
 * declare：让当前文件可以使用外部定义的变量、函数、类等
 */
// 声明变量
declare let x:number
// 声明函数
declare function sayHi(): string
// 声明类
declare class Animal {
    constructor(name: string)
    eat():void
}
// 声明enum
declare enum Color{
  A,
  B
}
// 声明module/namespace
declare module SchoolLib {
  class Student{
    constructor(name: string)
    study():void
  }
  type StudentType = '高一' | '高二' | '高三'   
}
/**
 * 使用
 */
x = 1
sayHi()

let ZhangSan: SchoolLib.StudentTypes = new SchoolLib.Student("张三")