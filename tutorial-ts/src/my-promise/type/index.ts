type ResolveType = (value: unknown) => void
type RejectType = (reason?: any) => void
type Executor = (resolve: ResolveType, reject: RejectType) => void

type OnFulfilled = ((data: unknown) => unknown) | null | undefined
type OnRejected = ((reason: any) => unknown) | null | undefined
type OnSettled = OnFulfilled | OnRejected
type OnFinally = () => void

type HandlerObj = {
  onSettled: OnSettled
  state: PromiseState
  resolve: ResolveType
  reject: RejectType
}

// type PromiseState = 'pending' | 'fulfilled' | 'rejected'
enum PromiseState {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected',
}

interface MyPromise<T> {
  readonly [Symbol.toStringTag]: string
}
export {
  MyPromise,
  OnFinally as onFinally,
  HandlerObj,
  ResolveType,
  RejectType,
  Executor,
  PromiseState,
  OnSettled,
  OnFulfilled,
  OnRejected,
}
