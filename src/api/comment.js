import request from '@/utils/request'
export const getComments = ({
  isArticle,
  // 源id,文章的id
  source,
  // 评论的id
  offset,
  // 获取评论的数量
  limit

}) => {
  return request.get('/app/v1_0/comments', {
    params: {
      // 利用一个布尔值控制是对文章的评论或对评论的评论
      type: isArticle ? 'a' : 'c',
      source,
      offset,
      limit
    }
  })
}
// 发布评论的api
export const sendComment = ({
  // 评论的目标id(评论的文章id,评论回复则评id)
  target,
  content,
  artId
}) => {
  return request.post('/app/v1_0/comments', {
    target,
    content,
    art_id: artId
  })
}
