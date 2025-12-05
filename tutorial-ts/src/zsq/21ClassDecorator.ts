/**
 * 不带参数的装饰器
 * @param targetClass
 */
function FirstClassDecorator(targetClass: any) {
  let targetClassObj = new targetClass();

  targetClassObj.buy();
  console.log("targetClass.name: ", targetClass.name);
}

@FirstClassDecorator
class CustomerService {
  name: string = "下单";
  constructor() {}

  buy() {
    console.log(this.name + "购买");
  }
  placeOrder() {
    console.log(this.name + "下单购买");
  }
}
