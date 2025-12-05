// 参数、返回值定义，以及默认值、可选参数
function add(a:number, b:number = 0):number{
    return a+b
}
const minus = (a:number , b?:number):number => {
    if(!b) return a;
    return a-b
}

const multi: (a:number,b:number) => number = 
function (a, b) 
{
    return a+b
}

// 定义为type
type TypTestFunc = (number1: number) => number

/**
 * rest参数
 */

/**
 * 函数解构
 */
type paramType = {name: string, age: number}
function subInfo({name}:paramType){
    console.log(name)
}
// subInfo({name:"zjt", age: 12})

/**
 * 函数重载
 */
interface Message{
    id:number,
    type:MessageType,
    sendMessage:string
}
enum MessageType {
    IMAGE = "IMAGE",
    AUDIO = "AUDIO"
}
let messages:Array<Message> = [
    {
        id:1,
        type:MessageType.IMAGE,
        sendMessage: "想你了"
    },
    {
        id:2,
        type:MessageType.AUDIO,
        sendMessage: "123"
    }
]
/**
 * 在单个函数中实现按多种类型搜索
 * 问题：
 * 1. 返回类型多，可读性差
 * 2. 因为返回类型多，使用时还需要类型断言，增加bug风险，读起来也不优雅
 */
function searchMessage(condition: number | MessageType){
    console.log(typeof condition)
    if(typeof condition === "number"){
        return messages.find(msg => msg.id === condition)
    }else {
        return messages.filter(msg => msg.type === condition)
    }
}

/**
 * 函数重载
 * @param condition 
 */
function searchMessage2(condition: number):Message | undefined;
function searchMessage2(condition: MessageType):Message[];
function searchMessage2(condition: number | MessageType){
    if(typeof condition === "number"){
        return messages.find(msg => msg.id === condition)
    }else {
        return messages.filter(msg => msg.type === condition)
    }
}
// 使用时可以根据参数推断出返回类型 
console.log(searchMessage2(1)?.type)
console.log(searchMessage2(MessageType.AUDIO))

export {}