<template>
  <!--  整体的列表 -->
  <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
    <!--  每一项 数据-->
    <van-cell v-for="comment in list" :key="comment.com_id.toString()">
      <!-- 图片 -->
      <div slot="icon">
<img class="avatar" :src="comment.aut_photo"  alt=''>
      </div>
      <!-- 文章的标题 -->
      <div slot="title">
        <span>{{comment.aut_name}}</span>
      </div>
      <!-- 默认插槽 -->
      <div slot="default">
        <van-button icon="like-o" size="mini" plain>赞</van-button>
      </div>
      <!-- 注释插槽 -->
      <div slot="label">
        <p>{{comment.content}}</p>
        <p>
          <span>{{comment.pubdate | fmtDate}}</span>
          <span @click="handleShowReplyList(comment)">回复 {{comment.reply_count}}</span>
        </p>
      </div>
    </van-cell>
  </van-list>
</template>

<script>
import { getComments } from '@/api/comment'
import eventBus from '@/utils/eventBus'
export default {
  name: 'CommentList',
  props: ['isArticle', 'id'],

  data () {
    return {
      finished: false,
      loading: false,
      list: [],
      offset: null,
      // 获取评论的数量
      limit: 10
    }
  },
  methods: {
    // 点击事件将点击出弹出层,将true这个信息放到仓库里面
    handleShowReplyList (comment) {
      this.$store.commit('setShowReplyList', true)
      this.$store.commit('setCurrentComment', comment)
    },
    async onLoad () {
      try {
        // 发送请求请求数据
        const data = await getComments({
          isArticle: this.isArticle,
          source: this.id,
          offset: this.offset,
          limit: this.limit
        })
        // 返回最后一个值的评论记录下来
        this.offset = data.last_id
        // 将返回的评论内容添加到list里面
        this.list.push(...data.results)
        // 将加载状态改成false
        this.loading = false
        if (data.results.length === 0) {
        // 内容加载完毕显示加载完毕
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取评论')
      }
    }
  },
  created () {
    this.onLoad()
    eventBus.$on('sendSuccess', (obj) => {
      if (this.isArticle === obj.isArticle) {
        this.list.unshift(obj.comment)
      }
    })
  }
}
</script>

<style lang="less" scoped>
 .avatar {
  width: 25px;
  height: 25px;
  border-radius: 100%;
  margin-right: 5px;
}
.van-list {
  margin-bottom: 64px;
}
</style>
