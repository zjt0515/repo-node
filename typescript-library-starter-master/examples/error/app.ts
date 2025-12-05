import { AxiosError } from '../../src/helpers/error'
import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/wrongurl'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

axios({
  method: 'get',
  url: '/error/get'
})
  .then(res => {
    console.log(res)
  })
  .catch(e => {
    console.log(e)
  })

// 5s内 offline，模拟网络错误
setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  })
    .then(res => {
      console.log(res)
    })
    .catch(e => {
      console.log(e)
    })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
})
  .then(res => {
    console.log(res)
  })
  .catch((e: AxiosError) => {
    console.log(e)
    console.log('message', e.message)
    console.log('config', e.config)
    console.log('code', e.code)
    console.log('request', e.request)
    console.log(e.isAxiosError)
  })
