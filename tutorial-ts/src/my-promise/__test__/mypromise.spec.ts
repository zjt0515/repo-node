import { isMyPromise, isPromise, MyPromise, runMicroTask } from '../hand-promise'
import { PromiseState } from '../type'

describe('promise', () => {
  it('happy path', () => {
    // pending
    let p1 = new MyPromise((resolve, reject) => {})
    expect(p1.state).toBe(PromiseState.PENDING)

    // fulfilled
    let p2 = new MyPromise((resolve, reject) => {
      resolve(1)
    })
    expect(p2.state).toBe(PromiseState.FULFILLED)
    expect(p2.result).toBe(1)

    // rejected
    let p3 = new MyPromise((res, rej) => {
      rej('error')
    })
    expect(p3.state).toBe(PromiseState.REJECTED)
    expect(p3.result).toBe('error')
  })

  it('同步executor', () => {
    // pending
    let p1 = new MyPromise((resolve, reject) => {
      resolve(1)
    })

    let final = p1.then(() => {}).then(() => {})

    expect(final).resolves.toBe(1)
    expect(final).resolves.toBe(1)
  })
})

describe('then', () => {
  it('should return promise 级联promies', async () => {
    let p = new MyPromise((res, rej) => {
      res(0)
    })
    let data = await p
      .then((data) => {
        return 1
      })
      .then(() => {
        return 2
      })
      .then(() => {
        return 3
      })
    expect(data).toBe(2)
  })

  it('should has _handlers', () => {
    function a1() {}
    function a2() {}
    function b1() {}
    let p1 = new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve(123)
      }, 1000)
    })
    p1.then(a1, b1).then(a2)
    // for (const handler in p1.handlers) {
    //   expect(handler)
    // }

    console.log(p1.handlers)
    // expect(p1.handlers[0]).toContain(a1)
    // expect(p1.handlers[0]).toContain(b1)
    // expect(p1.handlers[1]).toContain(a2)
  })

  it('状态穿透', () => {
    let rejPromise = new MyPromise((res, rej) => {
      rej(1)
    })
    let noOnRejPromise = rejPromise.then((data) => {})

    let resPromise = new MyPromise((res, rej) => {
      res(1)
    })
    let noOnResPromise = resPromise.then()

    expect(noOnRejPromise.equals(rejPromise)).toBeTruthy()
    expect(noOnResPromise.equals(resPromise)).toBeTruthy()
  })

  it('onFunc 执行报错', () => {
    let rejPromise = new MyPromise((res, rej) => {
      res(1)
    })
    let p2 = rejPromise.then((data) => {
      throw '123'
    })

    expect(p2.state).toBe(PromiseState.REJECTED)
    expect(p2.result).toBe('123')
  })

  it('onFunc 正常执行', () => {
    let rejPromise = new MyPromise((res, rej) => {
      res(1)
    })
    let p2 = rejPromise.then((data) => {
      return 456
    })

    expect(p2.state).toBe(PromiseState.FULFILLED)
    expect(p2.result).toBe(456)
  })
  it('isPromise()', () => {
    let p1 = new MyPromise((res, rej) => {
      res(1)
    })
    let p2 = p1.then((data) => {
      return 456
    })

    let p = new Promise((res, rej) => {
      res(1)
    })

    expect(isPromise(p1)).toBeTruthy()
    expect(isPromise(p2)).toBeTruthy()
    expect(isPromise(p)).toBeTruthy()
  })

  it('onFunc 返回 new Promise', () => {
    let p1 = new MyPromise((res, rej) => {
      res(1)
    })
    let p2 = p1.then((data) => {
      return new MyPromise((res, rej) => {
        rej('error: hfhf')
      })
    })
    expect(p1.state).toBe(PromiseState.FULFILLED)
    expect(p2.state).toBe(PromiseState.REJECTED)
    expect(p2.result).toBe('error: hfhf')
  })

  it('should support different promise 1', () => {
    let p1 = new MyPromise((res, rej) => {
      res(1)
    })
    let p2res
    let p2 = p1
      .then((data) => {
        return new Promise((res, rej) => {
          res(2)
        })
      })
      .then((data) => {
        p2res = data
      })

    expect(p2.state).toBe(PromiseState.FULFILLED)
    expect(p2res).toBe(2)
  })

  it('should support different promise 2', () => {
    let pro = new Promise((res, rej) => {
      res(1)
    })
    return pro
      .then((data) => {
        return new MyPromise((res, rej) => {
          res(2)
        })
      })
      .then(function test(data) {
        console.log(data)
      })
  })
})

describe('async and await', () => {
  it('happy path', async () => {
    let data = await new MyPromise((res, rej) => {
      setTimeout(() => {
        res(1)
      }, 1000)
    })
    expect(data).toBe(1)
  })
})

describe('finally', () => {
  it('happy path', () => {
    const pro = new MyPromise((res, rej) => {
      res(1)
    })

    const pro2 = pro.finally(() => {})
    expect(pro2.state).toBe(PromiseState.FULFILLED)
    expect(pro2.result).toBe(1)
  })

  it('onfinlly throw error', () => {})
})

describe('Promise static methods 静态方法', () => {
  it('MyPromise.reject', () => {})
  it('MyPromise.resolve', () => {})

  describe('MyPromise.all()', () => {
    it('one reject', () => {
      let p1 = MyPromise.resolve(1)
      let p2 = MyPromise.reject(2)

      return expect(MyPromise.all([p1, p2])).rejects.toBe(2)
    })
    it('all resolved', () => {
      let p1 = MyPromise.resolve(1)
      let p2 = MyPromise.resolve(2)
      let p3 = MyPromise.resolve(2)

      return expect(MyPromise.all([p1, p2])).resolves.toEqual([1, 2, 3])
    })
    it('check order', () => {
      let p1 = new MyPromise((res) => {
        setTimeout(() => {
          res(3)
        }, 300)
      })
      let p2 = new MyPromise((res) => {
        setTimeout(() => {
          res(2)
        }, 100)
      })
      let p3 = new MyPromise((res) => {
        setTimeout(() => {
          res(1)
        }, 200)
      })

      return expect(MyPromise.all([p1, p2, p3])).resolves.toEqual([3, 2, 1])
    })
  })

  describe('Promise.allSettled()', () => {
    it('return what', (done) => {
      MyPromise.allSettled([
        MyPromise.resolve(33),
        new MyPromise((resolve) => setTimeout(() => resolve(66), 0)),
        99,
        MyPromise.reject('错误'),
      ]).then((values) => {
        console.log(values)
        done()
      })
    })
  })

  describe('Promise.race()', () => {
    it('return what', (done) => {
      const p1 = getSleepPromise(500, 1, PromiseState.FULFILLED)
      const p2 = getSleepPromise(100, 2, PromiseState.FULFILLED)

      Promise.race([p1, p2, 5]).then((value) => {
        expect(value).toBe(5)
        done()
      })
    })
  })
})

// 辅助测试代码
function getSleepPromise(time: number, value: unknown, state: PromiseState) {
  return new MyPromise((res, rej) => {
    if (state === PromiseState.PENDING) return
    setTimeout(() => {
      if (state === PromiseState.FULFILLED) {
        res(value)
      } else {
        rej(value)
      }
    }, time)
  })
}

// describe('runMicroTast', () => {
//   it('happy path', () => {
//     let p = new Promise((res, rej) => {
//       let str = ''
//       setTimeout(() => {
//         str += '1'
//       })

//       runMicroTask(() => {
//         str += '2'
//       })

//       str += '3'
//       res(str)
//     })

//     return p.then((data) => {
//       expect(data).toBe('321')
//     })
//   })
// })

// test('happy path', () => {
//   expect(1 + 2).toBe(3)
// })
