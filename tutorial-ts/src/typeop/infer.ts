interface Customer {
  custname: string
  buymoney: number
}
type CustFn = (params: Customer) => string;

type CustParaTyp = CustFn extends (params: infer P)=>any?P:CustFn