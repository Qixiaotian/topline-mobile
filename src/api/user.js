// 第一种形式
// import request from '../utils/request'
// export const login = ({ mobile, code }) => {
//   return request.post('/app/v1_0/authorizations', { mobile, code })
// }

// 第二种书写形式
import { createAPI } from '@/utils/request'
export const login = ({ mobile, code }) => createAPI('/app/v1_0/authorizations', 'post', { mobile, code })
export const blacklists = (id) => createAPI('/app/v1_0/user/blacklists', 'post', { target: id })
