/**
 * 快排，不改变原数组写法
 * 支持传入各种可以直接比较的元素的数组
 * @param arr 
 * @returns
 */
function quickSort<T>(arr: Array<T>):Array<T>{
    if(arr.length < 2) return arr

    const mid =  Math.floor(arr.length / 2)
    const midValue = arr.splice(mid, 1)[0]

    let left:Array<T> = []
    let right:Array<T> = []

    for(let i = 0; i < arr.length; i++){
        const item = arr[i]
        if(item <= midValue){
            left.push(item)
        }else {
            right.push(item)
        }
    }
    //
    return quickSort(left).concat(midValue, quickSort(right))
    
}
let test1 = [5,3,7,8,2,4,4,2,2,3,5]
console.log(quickSort(test1))

let test2 = ["a", "c", "b", "h", "z","a","f","f","a"]
console.log(quickSort(test2))


/**
 * 
 */
let chineseWords = ["在","被","从","啊","分","的"]

function ChineseSort(arr:string[]){
    return arr.sort((a, b) => {
        return a.localeCompare(b,"zh-CN")
    })
}

console.log(ChineseSort(chineseWords))
console.log(chineseWords)
export {}