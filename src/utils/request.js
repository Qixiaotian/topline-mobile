// 引入axios
import axios from 'axios'
import bigint from 'json-bigint'
import store from '@/store/index'
import router from '@/router'
// 创建一个实例
export const createAPI = (url, method, data) => {
  let config = {}
  if (method === 'get') {
    config.params = data
  } else {
    config.data = data
  }
  return instance({
    url,
    method,
    ...config
  })
}
const instance = axios.create({
  timeout: 4000,
  baseURL: ' http://ttapi.research.itcast.cn'
})
// 在处理大数的时候 ,一定要在请求前处理掉
instance.defaults.transformResponse = [data => {
  try {
    return bigint.parse(data)
  } catch (err) {
    return data
  }
}]
// axios设置请求拦截器
instance.interceptors.request.use(config => {
  if (store.state.user) {
    config.headers.Authorization = `Bearer ${store.state.user.token}` // 设置响应头
  }
  return config
}, err => {
  console.log(err)
})
// axios设置响应拦截器
instance.interceptors.response.use(response => {
  return response.data.data || response.data // 拦截处理响应结果，直接返回需要的数据
}, async function (err) {
  if (err.response.status === 401) {
    // 如果是401，使用refresh_token交换新的token
    const refreshToken = store.state.user.refresh_token
    try {
      const response = await axios({
        method: 'put',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${refreshToken}`
        }
      })
      // 将请求回来的token,和refresh_token放到仓库里面
      const token = response.data.data.token
      store.commit('setUer', {
        token: token,
        refresh_token: refreshToken
      })
      //  在内部自动进行发送请求  其中的参数都在config对象里面
      return instance(err.config)
    } catch (err) {
      console.log(err)
      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
  }
  return Promise.reject(err)
})
export default instance
