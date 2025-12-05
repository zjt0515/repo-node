/**
 * 泛型约束
 */
class Order {
    orderId!:boolean
    orderName!:string
    static count: number
    printOrd(){}
    static getCount(){return Order.count}
}
// 约束传入的类型必须继承自object
type PropKeys<T extends object> = keyof T
type OrderProps = PropKeys<Order>

// type OrdInstance = 

/**
 * 函数中的泛型约束
 * 
 * 比较a的length属性和b的length值大小
 * @param a 
 * @param b 
 */
function comp<T extends {length:number}>(a:T,b:T){
    return a.length >= b.length
}
console.log(comp([1, 2], [1, 2, 3])) // 正确
console.log(comp('ab', 'abc')) // 正确

/**
 * vue源码中的泛型约束
 */
