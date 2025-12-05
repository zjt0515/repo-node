enum BusEnum {
    SCHOOL_20,
    SCHOOL_40
}
class Vechile{

    price:number
    constructor(price:number){
this.price = price
    }
    run(){
        console.log("Vechile running...")
    }
}
class Bus extends Vechile{
    public type:BusEnum
    constructor(price:number, _type:BusEnum){
        super(price)
        this.type = _type
    }
    run(){
        console.log("Bus running...")
    }
    public getPrice() {
        if(this.type === BusEnum.SCHOOL_20) return 1
        else if(this.type === BusEnum.SCHOOL_40) return 0.5
    }
}
class Customer {
    useVechile(vechile:Vechile){
        vechile.run()
    }
}
let me = new Customer()
me.useVechile(new Bus(100)) 