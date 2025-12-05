/**
 * 带参装饰器
 * @param params
 * @returns
 */
function FirstClassDecorator(params: any) {
  return function (targetClass: any) {
    let targetClassObj = new targetClass();
    targetClassObj.buy();
    console.log('targetClass.name: ', targetClass.name);
    console.log('params: ', params);
  };
}

@FirstClassDecorator('修饰CS类的装饰器参数')
class CustomerService {
  name: string = '下单';
  constructor() {}

  buy() {
    console.log(this.name + '购买');
  }
  placeOrder() {
    console.log(this.name + '下单购买');
  }
}

export {};
