// import { Executor, PromiseState, RejectType, ResolveType } from './type'

// export class Promise<T = any> {
//   status: PromiseState

//   public resolve!: ResolveType
//   public reject!: RejectType

//   public resolvedValue!: any
//   public rejectedReason!: any

//   constructor(executor: Executor) {
//     this.status = 'pending'

//     this.resolve = (value: any): any => {
//       if (this.status === 'pending') {
//         this.status = 'fulfilled'

//         // 模拟resolve中途出错
//         value[10] = 100

//         this.resolvedValue = value
//       }
//     }

//     this.reject = (reason: any): any => {
//       if (this.status === 'pending') {
//         this.status = 'rejected'
//         this.rejectedReason = reason
//       }
//     }

//     // 执行executor, 同时向外传递俩函数
//     try {
//       executor(this.resolve, this.reject)
//     } catch (error) {
//       this.status = 'pending'

//       if (error instanceof Error) {
//         this.reject(error.toString())
//       }
//     }
//   }

//   then(resolveInThen: ResolveType, rejectInThen: RejectType) {
//     if (this.status === PromiseState.FULFILLED) {
//       resolveInThen(this.resolvedValue)
//     } else if (this.status === 'rejected') {
//       rejectInThen(this.rejectedReason)
//     }
//     return
//   }
// }

// export {}
