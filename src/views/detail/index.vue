<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="文章详情"
      left-text="返回"
      fixed
      @click-left="$router.push('/')"
    />
    <div class="article" v-if="articles">
      <!-- 文章标题 -->
      <h2 class="article-title">{{articles.title}}</h2>
      <!-- 作者信息 -->
      <author-info :article="articles"></author-info>
      <!-- 文章内容 -->
      <div class="article-content" v-html="articles.content">

      </div>
      <!-- 点赞和取消 -->
      <more-action :article="articles"></more-action>
      <!-- 评论列表 -->
      <comment-list :isArticle ="true" :id="articles.art_id.toString()" ></comment-list>
      <!-- 发送评论 -->
      <send-comment :isArticle="true" :target='articles.art_id'></send-comment>
      <reply-list v-model="showReplyList" :art_id='id'></reply-list>
    </div>
  </div>
</template>

<script>
import { getArticle } from '../../api/article'
import AuthorInfo from './componect/AuthorInfo'
import MoreAction from './componect/MoreAction'
import CommentList from './componect/CommentList'
import SendComment from './componect/SendComment'
import ReplyList from './componect/ReplayList'
import { mapState } from 'vuex'
export default {
  components: {
    AuthorInfo,
    MoreAction,
    CommentList,
    SendComment,
    ReplyList
  },
  name: 'Detail',
  //  文章的id
  props: ['id'],
  data () {
    return {
      articles: null
    }
  },
  methods: {
    async loadData () {
      const data = await getArticle(this.id)
      this.articles = data
    }
  },
  created () {
    this.loadData()
  },
  // 导入辅助函数将showReplyList的状态传给组件ReplyList
  computed: {
    ...mapState(['showReplyList'])
  }
}
</script>

<style lang="less" scoped>
.article {
  margin-top: 48px;
  padding: 0px 20px;
  .article-title {
    font-size: 20px;
    font-weight: bold;
  }
  .article-content {
    font-size: 14px;
  }
}
</style>
