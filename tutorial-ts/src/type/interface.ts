/**
 * 接口：定义对象类型的类型
 * 定义接口
 * 接口命名：P 
 */
interface Point {
    // 只读属性
    readonly id: number
    x:number
    y:number
}
declare const MyPoint: Point
// 重名接口合并
interface Point {
    // 函数属性
    shake?(): void
    name? : string
    [propName: string]: any
    // 可选属性
    color?: string
}
/**
 * 接口继承接口，继承其他接口的属性
 */
interface shaped {
    shape: {}
}
interface Point extends shaped {

}
/**
 * 创建对象
 */
const p1:Point = {
    id: 0,
    x:1,
    y:2,
    name: 'p1',
    shape: {}
}
/**
 * class implements interface
 */
class PointNode implements Point{
    id:number
    x:number
    y:number
    shape: {}
    constructor(id:number,x:number,y:number){
        this.id = id
        this.x = x
        this.y = y
        this.shape = {}
    }
}
/**
 * 类实现接口
 */
interface List {
    add(): void
    remove(): void
}
class ArrayList implements List {
    add(): void {
        throw new Error("Method not implemented.")
    }
    remove(): void {
        throw new Error("Method not implemented.")
    }
}
class LinkedList implements List {
    add(): void {
        throw new Error("Method not implemented.")
    }
    remove(): void {
        throw new Error("Method not implemented.")
    }
}




/**
 * 可索引签名
 */
interface MyProduct {
    name:string
    price:number
    sell(): number

    // 不确定数量，不确定名称的属性

    // string/symbol类型支持所有类型的属性名
    [x: string]: any
    // [x: symbol]: any
    // number只支持number
    // [x: number]: any

    // 如果定义了可索引签名值的类型，则必须能够兼容前面所有值的类型
    // [x: string]: number
}

let p: MyProduct = {
    name: '绯红列赞',
    price: 1078,
    account: 200,
    sell: function(){
        return 10
    },
    // 测试string
    [Symbol("stockno")]: 400,
    100: 300,
    true: "ok"
}

/**
 * 利用索引获取接口属性值的类型
 */

type NameType = MyProduct["name"]
type PriceType = MyProduct["price"]
type NameAndPriceType = MyProduct["name" | "price"]
