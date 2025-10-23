console.log(this === module.exports) // true
console.log(this === exports) // true
exports.a = 1
this.b = 2
console.log(exports)
console.log(this)
console.log(module.exports)

exports = {
  c: 2,
}
console.log(exports)
console.log(this)
console.log(module.exports)
