<template>
  <div class="more-action">
       <!--  attitude 用户对文章的态度, -1: 无态度，0-不喜欢，1-点赞 -->
    <van-button
      :icon="article.attitude === 1? 'star' : 'star-o'"
      round
      :loading="false"
      type="danger"
      @click="handleLike"
    >点赞</van-button>

    <van-button
      icon="delete"
      round
      :loading="false"
      type="danger"
    >不喜欢</van-button>
  </div>
</template>

<script>
import { likeArticle, unLikeArticle } from '@/api/article'
export default {
  props: ['article'],
  methods: {
    async handleLike () {
      if (!this.$checkLogin()) {
        return
      }
      try {
        if (this.article.attitude === 1) {
          await unLikeArticle(this.article.art_id)
          this.article.attitude = -1
          console.log(this.article)
        } else {
          await likeArticle(this.article.art_id)
          this.article.attitude = 1
        }
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.more-action {
  padding: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
