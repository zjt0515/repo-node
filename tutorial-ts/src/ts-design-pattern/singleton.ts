/**
 * 通过调用静态方法来生成(返回)单例
 */
class DateUtil2 {
  // s
  static dateUtil: DateUtil2
  private constructor() {}
  static getInstanc() {
    if (this.dateUtil === null) {
      this.dateUtil = new DateUtil2()
    }
    return this.dateUtil
  }
}

class CQ {
  static #instance: CQ | null = null

  private constructor(name: string) {}

  static getInstance() {
    if (!CQ.#instance) {
      CQ.#instance = new CQ('zjt')
    }
    return CQ.#instance
  }
}
const cq = CQ.getInstance()
