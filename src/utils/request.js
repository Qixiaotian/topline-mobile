// 引入axios
import axios from 'axios'
// 创建一个实例
const instance = axios.create({
  timeout: 4000,
  baseURL: ' http://ttapi.research.itcast.cn'
})
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
