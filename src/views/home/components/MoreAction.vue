<template>
  <!-- 弹层组件 不显示确认按钮 点击是否关闭遮罩层 -->
  <van-dialog
    :value="value"
    @input="$emit('input',$event)"
    :show-confirm-button="false"
    closeOnClickOverlay
  >
    <!--  通过showReports控制这两个表格的相互装换 -->
    <van-cell-group v-show="!showReports">
      <van-cell title="不感兴趣" icon="fire-o" @click="handle('dislike')" />
      <van-cell title="反馈垃圾内容" icon="location-o" is-link @click="showReports=true" />
      <van-cell title="拉黑作者" icon="bag-o" @click="handle('blacklist')" />
    </van-cell-group>
    <!-- 举报文章 -->
    <van-cell-group v-show="showReports">
      <van-cell icon="arrow-left" @click="showReports=false" />
      <van-cell title="标题夸张" />
      <van-cell title="低俗色情" />
      <van-cell title="错别字多" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle } from '@/api/article'
import { blacklists } from '@/api/user'
export default {
  name: 'MoreAction',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      sha: true,
      showReports: false
    }
  },
  created () {
    // console.log(this.article)
  },
  methods: {
    handle (type) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          this.blacklist()
          break
      }
    },
    async  dislike () {
      try {
        await dislikeArticle(this.article.art_id)
        this.$toast.success('操作成功')
        this.$emit('handlesuccess')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    },
    async blacklist () {
      try {
        await blacklists(this.article.aut_id)
        this.$toast.success('操作成功')
        this.$emit('handlesuccess')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style>
</style>
