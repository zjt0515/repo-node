import { count } from 'console'
import {
  Executor,
  OnFulfilled,
  OnRejected,
  PromiseState,
  RejectType,
  ResolveType,
  HandlerObj,
  onFinally,
} from './type'

export class MyPromise {
  private _value: any
  private _state: PromiseState

  private _handlers: Array<HandlerObj>

  constructor(executor: Executor) {
    this._state = PromiseState.PENDING
    this._value = null
    this._handlers = []

    // this指向
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * # then() -> _pushHanlders() + executreHandlers
   * @param onFulfilled
   * @param onRejected
   * @returns new Promise
   */
  then(onFulfilled?: OnFulfilled | null, onRejected?: OnRejected) {
    return new MyPromise((resolve, reject) => {
      // onSettled 加入当前promise的handlers队列
      this._pushHanlders(onFulfilled, PromiseState.FULFILLED, resolve, reject)
      this._pushHanlders(onRejected, PromiseState.REJECTED, resolve, reject)
      // 入队后 recent promise 可能已经settled，要尝试执行一次
      this._executeHandlers()
    })
  }

  catch(onRejected: OnRejected) {
    return this.then(null, onRejected)
  }

  finally(onFinally: onFinally) {
    return this.then(
      (data) => {
        onFinally()
        return data
      },
      (reason) => {
        onFinally()
        throw reason
      }
    )
  }

  /**
   *
   * @param executor onRejected | onFulfilled | ..
   * @param state
   * @param resolve resolve -> the promise returned by then -> resolve
   * @param reject reject -> then返回的promise rejected
   */
  private _pushHanlders(
    onSettled: any,
    state: PromiseState,
    resolve: ResolveType,
    reject: RejectType
  ) {
    this._handlers.push({
      onSettled,
      state,
      resolve,
      reject,
    })
  }

  /**
   * _changeState -> _executeHandlers
   * then -> _executeHandlers (then之前就not pending)
   * @returns
   */
  private _executeHandlers() {
    if (this._state === PromiseState.PENDING) return
    while (this._handlers[0]) {
      let handler = this._handlers[0]
      this._runHandler(handler)
      this._handlers.shift()
    }
  }

  private _runHandler({ onSettled, state, resolve, reject }: HandlerObj) {
    runMicroTask(() => {
      if (state !== this._state) return

      if (typeof onSettled !== 'function') {
        // 不是函数 -> 状态穿透
        this._state === PromiseState.FULFILLED ? resolve(this._value) : reject(this._value)
        return
      }

      try {
        // 将value传入新promise的onSettled
        const value = onSettled(this._value)

        // 处理new Promise <- 根据 value / catch error

        if (isPromise(value)) {
          //  状态继承该promise
          ;(value as Promise<any> | MyPromise).then(resolve, reject)
        } else {
          resolve(value)
        }
        // runMicroTask(executor.bind(this))
      } catch (err) {
        reject(err)
      }
    })
  }

  // user use
  private _resolve(data: any) {
    this._changeState(PromiseState.FULFILLED, data)
  }
  // user use
  private _reject(reason: any) {
    this._changeState(PromiseState.REJECTED, reason)
  }

  // _resolve / _reject -> changeState()
  private _changeState(state: Exclude<PromiseState, PromiseState.PENDING>, value: any) {
    if (this._state !== PromiseState.PENDING) return
    this._state = state
    this._value = value
    this._executeHandlers()
  }

  public equals(myPromise: MyPromise) {
    return this._state === myPromise.state && this._value === myPromise.result
  }

  get state() {
    return this._state
  }

  get result() {
    return this._value
  }

  get handlers() {
    return this._handlers
  }

  toString() {
    return '[object MyPromise]'
  }

  // * =================== Section: 静态方法 ===================
  /**
   *
   * @param data
   * @returns {MyPromise}
   */
  static resolve(data: any) {
    if (data instanceof MyPromise) return data
    if (isPromise(data)) {
      return new MyPromise((res, rej) => {
        data.then(res, rej)
      })
    }
    return new MyPromise((resolve, reject) => {
      resolve(data)
    })
  }
  /**
   *
   * @param reason
   * @returns {MyPromise}
   */
  static reject(reason: any) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }
  static all(promises: Array<MyPromise>) {
    return new MyPromise((resolve, reject) => {
      let values: Array<any> = []
      let count = 0
      let fulfilledCount = 0
      // add handler
      for (const pro of promises) {
        let index = count++

        MyPromise.resolve(pro).then(
          (data) => {
            values[index] = data
            fulfilledCount++
            // check all
            if (fulfilledCount === count) {
              resolve(values)
            }
          },
          (reason) => {
            reject(reason)
          }
        )
      }
    })
  }

  static allSettled(promises: [] | readonly unknown[]) {
    return new Promise((res, rej) => {
      let values: any[] = []
      let count = 0
      let settledPromise = 0
      for (const pro of promises) {
        let i = count++
        MyPromise.resolve(pro).then(
          (data) => {
            let result = {
              status: PromiseState.FULFILLED,
              value: data,
            }
            values[i] = result
            settledPromise++
            if (count === settledPromise) {
              res(values)
            }
          },
          (reason) => {
            let result = {
              status: PromiseState.REJECTED,
              value: reason,
            }
            values[i] = result
            settledPromise++
            if (count === settledPromise) {
              res(values)
            }
          }
        )
      }
    })
  }

  static race(promises: [] | readonly unknown[]) {
    return new MyPromise((res, rej) => {
      for (const pro of promises) {
        MyPromise.resolve(pro).then(res, rej)
      }
    })
  }
}
/**
 * cb -> 微队列任务
 * @param callback
 */
export function runMicroTask(callback: Function) {
  // node环境和部分支持的浏览器环境
  if (process && process.nextTick) {
    process.nextTick(callback)
  } else if (MutationObserver) {
    const p = document.createElement('p')
    // TODO 单例模式
    const observer = new MutationObserver(callback as MutationCallback)
    observer.observe(p, {
      childList: true,
    })
    p.innerHTML = '1'
  } else {
    setTimeout(callback, 0)
  }
}

export function isMyPromise(obj: any) {
  console.log(Object.prototype.toString.call(obj))
  return obj && obj.toString() === '[object MyPromise]'
}

// Promise A+规范
export function isPromise(obj: any) {
  return !!(obj && typeof obj === 'object' && typeof obj.then === 'function')
}

export async function getPromiseState(p: any) {
  if (!isPromise(p)) return -1

  let target = {}
  let res = await Promise.race([p, target]).then(
    (data) => {
      return data === target ? PromiseState.PENDING : PromiseState.FULFILLED
    },
    () => {
      return PromiseState.REJECTED
    }
  )
  return res
}
