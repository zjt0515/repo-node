import { getPromiseState } from '../hand-promise'
import { PromiseState } from '../type'

describe('promise', () => {
  it('onSettled !== funciton', () => {
    let p = new Promise(() => {})

    let p2 = p.then(1 as any)

    console.log(p2)
  })
})

describe('then', () => {
  it('多个onSettled', (done) => {
    let p1 = Promise.resolve(1)
    let p2 = p1.then((data) => {
      setTimeout(() => {
        console.log(data)
      }, 1000)
    })
    let p3 = p1.then((data) => {
      setTimeout(() => {
        console.log(data)
        done()
      }, 1000)
    })
    expect(p1).resolves.toBe(1)
    expect(p2).resolves.toBe(1)
    expect(p3).resolves.toBe(1)
  })

  it('级联then: fulfilled', () => {
    return expect(
      Promise.resolve(1)
        .then((data) => {
          expect(data).toBe(1)
          return 2
        })
        .then((data) => {
          expect(data).toBe(2)
          return 3
        })
        .then((data) => {
          expect(data).toBe(3)
          return 4
        })
    ).resolves.toBe(4)
  })

  it('中断promise链', (done) => {
    Promise.resolve(1)
      .then((data) => {
        expect(data).toBe(1)
        return 2
      })
      .then((data) => {
        expect(data).toBe(2)
        return new Promise(() => {})
      })
      .then((data) => {
        done()
      })
  })

  it('值穿透', (done) => {
    Promise.resolve(1)
      .then(2 as any)
      .then(3 as any)
      .then((data) => {
        expect(data).toBe(1)
        done()
      })
  })
})

describe('catch', () => {})
describe('finally', () => {})

describe('static methods', () => {
  describe('Promise.all()', () => {
    it('all', (done) => {
      Promise.all([Promise.resolve(1), Promise.resolve(2)]).then((data) => {
        expect(data).toContain(1)
        expect(data).toContain(2)
        done()
      })
    })
    it('all', () => {
      return expect(
        Promise.all([Promise.resolve(1), Promise.reject(2)]).then((data) => {})
      ).rejects.toBe(2)
    })
  })

  describe('Promise.race()', () => {
    it('race', () => {
      let p = Promise.resolve()
      // let p1 = Promise.reject()

      let target = {}
      return expect(
        Promise.race([p, target]).then(
          (data) => {
            return data === target ? PromiseState.PENDING : PromiseState.FULFILLED
          },
          () => {
            return PromiseState.REJECTED
          }
        )
      ).resolves.toBe(PromiseState.FULFILLED)
    })
  })

  describe('Promise.resolve', () => {
    it('value: Promise', () => {
      let p = Promise.resolve(1)
      let p2 = Promise.resolve(p)
      expect(p === p2).toBeTruthy()
    })
    it('value: PromiseLike', () => {
      let p = Promise.resolve(1)
      let p2 = Promise.resolve(p)
      expect(p === p2).toBeTruthy()
    })
    it('value: others', () => {
      let p = Promise.resolve(1)
      let p2 = Promise.resolve(2)
      p2.then((data) => {
        expect(data).toBe(2)
      })
      expect(p !== p2).toBeTruthy()
      return expect(getPromiseState(p2)).resolves.toBe(PromiseState.FULFILLED)
    })
  })

  describe('Promise.reject()', () => {
    it('happy reason', () => {
      Promise.reject('err').catch((reason) => {
        expect(reason).toBe('err')
      })
      // p.catch((reason) => {
      //   expect(reason).toBe(1)
      // })
      // expect(p).rejects.toBe('err')
      // return expect(getPromiseState(p)).rejects.toBe(PromiseState.REJECTED)
    })
  })

  it('getPromiseState()', () => {
    let p = Promise.resolve()
    // let p1 = Promise.reject()
    return expect(getPromiseState(p)).resolves.toBe(PromiseState.FULFILLED)
  })
})
