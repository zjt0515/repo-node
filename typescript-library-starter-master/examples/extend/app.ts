import axios from '../../src'

// * =================== Section: 混合对象 ===================

// axios({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi'
//   }
// })
// axios.request({
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })

// * =================== Section: 函数重载 ===================

axios({
  url: '/extend/post',
  method: 'post',
  data: { msg: 'hello' }
})

axios('/extend/post', {
  method: 'post',
  data: { msg: 'hello' }
})

// * =================== Section: 响应数据支持泛型 ===================
