import request from '../utils/request'
// 封装获取频道列表的api
export const getDdefaultOrUserChannel = () => {
  return request.get('/app/v1_0/user/channels')
}
// 封装获取所有频道的api
export const getAllChannels = () => {
  return request.get('/app/v1_0/channels')
}
// 删除用户的频道
export const deleteChannels = (id) => {
  return request.delete(`/app/v1_0/user/channels/${id}`)
}
