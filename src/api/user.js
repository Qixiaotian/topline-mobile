// 第一种形式
// import request from '../utils/request'
// export const login = ({ mobile, code }) => {
//   return request.post('/app/v1_0/authorizations', { mobile, code })
// }

// 第二种书写形式
import { createAPI } from '@/utils/request'
export const login = ({ mobile, code }) => createAPI('/app/v1_0/authorizations', 'post', { mobile, code })
export const blacklists = (id) => createAPI('/app/v1_0/user/blacklists', 'post', { target: id })
// 取消关注的接口

export const followUser = (id) => createAPI('/app/v1_0/user/followings', 'post', { target: id })
export const unFollowUser = (id) => createAPI(`/app/v1_0/user/followings/${id}`, 'post')

// 封装获取用户指定信息的接口
export const getUserInfo = () => createAPI('/app/v1_0/user', 'get')
// 获取用户个人资料
export const getUserProfile = () => createAPI('/app/v1_0/user/profile', 'get')
