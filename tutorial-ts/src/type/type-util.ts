// * =================== Section: Utils!! ===================
type Assignable<X, Y> = X extends Y ? true : false

type MutuallyAssignable<X, Y> = X extends Y ? (Y extends X ? true : false) : false

type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2
  ? true
  : false

type test1 = Equal<any, 1>
// * =================== Section: Pick/Omit ===================
interface Person {
  name: string
  age: number
  phone: number
}
// 检查K是否是 T的key的 子类型
type name = Pick<Person, 'name'>
type personNumber = Pick<Person, 'age' | 'phone'>

// omit
type personNameAge = Omit<Person, 'phone'>

// * =================== Section: Extract/Exclude ===================
// Extract
type testExtract = Extract<string | number | boolean, string | boolean>

type GetObj<T> = Extract<T, object>

// Exclude 和Extract相反
type testExclude = Exclude<string | number | boolean, boolean>

type ExcludeArray<T> = Exclude<T, Array<any>>
type ExcludeArrayAnd<T> = Exclude<T, Array<any> | number | string>
