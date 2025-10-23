const mysql = require('mysql2/promise')

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'test_db',
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
})

// query

// connection.query('update user set `id`=2 where username = `z`;', (err, result, fileds) => {
//   console.log(result)
// })

// connection.query('delete from user where id = 1;', (err, result, fileds) => {
//   console.log(result)
// })

// connection.query('select * from user;', (err, result, fileds) => {
//   console.log(result)
// })

async function selectUserById(id) {
  const [result] = await connection.execute(`select * from user where id=?;`, [id])
  console.log(result)
}

async function selectUserByFirstname(firstname) {
  const [result] = await connection.execute(
    `select * from user where username like concat('%',?, '%');`,
    [firstname]
  )
  console.log(result)
}
// selectUserById(1)
selectUserByFirstname('张')
// connection.end()
