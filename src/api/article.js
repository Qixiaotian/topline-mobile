import request from '@/utils/request'
/**
 * 获取文章列表(登录和不登录)
 * @param {*} 参数 channel_id, timestamp, with_top
 */
export const getArticles = ({
  // 时间的id , 时间戳, 是否置顶
  // eslint-disable-next-line camelcase
  channel_id, timestamp, with_top
}) => {
  return request.get('/app/v1_1/articles', { params: { channel_id, timestamp, with_top } })
}
// 封装不感兴趣的文章的api
export const dislikeArticle = (id) => {
  return request.post('/app/v1_0/article/dislikes', {
    target: id
  })
}
// 封装举报文章的api
export const reports = ({ target, type }) => {
  return request.post('/app/v1_0/article/reports', { target, type })
}
// 获取文章详情,id文章的id
export const getArticle = (id) => {
  return request.get(`/app/v1_0/articles/${id}`)
}
export const likeArticle = (id) => {
  return request.post('/app/v1_0/article/likings', {
    target: id
  })
}

// 取消点赞
export const unLikeArticle = (id) => {
  return request.delete(`/app/v1_0/article/likings/${id}`)
}

// 不喜欢  上面有

// 取消不喜欢
export const unDislikeArticle = (id) => {
  return request.delete(`/app/v1_0/article/dislikes/${id}`)
}
// 设置上传图片的接口
export const uploadPhoto = (key, file) => {
  const formData = new FormData()
  formData.append(key, file)
  return request.patch('/app/v1_0/user/photo', formData)
}
