import request from '../utils/request'
// 封装获取频道列表的api
export const getDdefaultOrUserChannel = () => {
  return request.get('/app/v1_0/user/channels')
}
