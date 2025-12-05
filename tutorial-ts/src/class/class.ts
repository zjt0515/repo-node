import { count } from 'console'

class Animal {
  // 不给类型 -> 推导any
  x
  // 有初值 -> 自动推导
  y = 0
  // 只读属性
  readonly id: number = 1
  //

  son: Person
  name: string
  addr?: string
  // 私有成员
  private prop: string = 'Animal'
  // #real-private: string = '1'
  // 静态属性
  static count: number = 0
  constructor(_name: string, public _age: number, _addr?: string) {
    // 可以在构造方法内 修改readonly属性
    this.id = 'bar'
    this.name = _name
    this.addr = _addr
    this.son = new Animal('12', 12)
    Animal.count++
  }

  // 存取器方法 特殊的类方法
  set age(val: number) {
    if (val >= 0 && val <= 150) {
      this._age = val
    } else {
      throw new Error('年龄不在范围内')
    }
  }
  get age() {
    return this._age
  }
  // 会保存在原型对象中
  doEat() {
    console.log('animal eating!')
  }
  // 静态方法：工具类
  static Check() {}
}
let p = new Animal('zjt', 13)

// * =================== Section: 继承 ===================
class Cat extends Animal {
  override doEat(): void {
    console.log('cat eating!')
  }
}

// * =================== Section: 抽象类 ===================
abstract class Shape {
  // 抽象属性，子类必须实现
  abstract type: string
  constructor() {}
  // 抽象方法，需要子类实现
  abstract getV(): number
}
