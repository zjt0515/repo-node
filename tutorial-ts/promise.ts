type TsPromiseParam = (resolve: ResolveType, reject: RejectType) => any
type ResolveType = (success: any) => any
type RejectType = (fail:any) => any
class TsPromise{
    public reslove!: ResolveType
    public reject!: RejectType
    constructor(promiseParam: TsPromiseParam){
        // 构造函数接受一个函数类型的参数，该函数的参数还是2个函数
        // 这两个函数是promise内置的，无需外部定义，而第一个函数是外部定义的
        //  
        // 初始化reslove,reject
        this.reslove = (success) => {
            console.log(success)
        }
        this.reject = (fail) => {
            console.log(fail)
        }
        // 初始化好之后就要执行传入的函数
        promiseParam(this.reslove, this.reject);
    }
}

new TsPromise( (resolve, reject) => {
    resolve('成功')
})