// 引入axios
import axios from 'axios'
import bigint from 'json-bigint'
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
  config.headers.mytoken = 'nihao' // 设置响应头
  return config
}, err => {
  console.log(err)
})
// axios设置响应拦截器
instance.interceptors.response.use(response => {
  return response.data.data || response.data // 拦截处理响应结果，直接返回需要的数据
}, err => {
  console.log(err)
})
export default instance
