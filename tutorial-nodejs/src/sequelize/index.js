// require('./models/sync')

const User = require('./models/user')
// const user = User.build({
//   username: 'zjt123',
//   password: 'zzz',
// })
// user.save().then(() => {
//   console.log('add a user')
// })

User.create({ username: 'zjt321', password: 'zzz' }).then((ins) => {
  console.log(ins)
})
