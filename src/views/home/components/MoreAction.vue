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
      <van-cell icon="arrow-left" @click="showReports=false"></van-cell>
      <van-cell v-for="item in typeList" :key="item.type" :title="item.title" @click="handle('report',item.type)" />
      <van-cell title="错别字多" />
    </van-cell-group>
  </van-dialog>
</template>

<script>
import { dislikeArticle, reports } from '@/api/article'
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
      showReports: false,
      // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-低俗色情-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
      typeList: [
        { title: '其他问题', type: 0 },
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '低俗色情', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '侵权', type: 8 }
      ]
    }
  },
  created () {
    // console.log(this.article)
  },
  methods: {
    handle (type, reportType) {
      switch (type) {
        case 'dislike':
          this.dislike()
          break
        case 'blacklist':
          this.blacklist()
          break
        case 'report':
          this.report(reportType)
          break
      }
    },
    async dislike () {
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
    },
    async report (reportType) {
      try {
        await reports({ target: this.article.art_id, type: reportType })
        this.$emit('input', false)
        this.$toast.success('操作成功')
        this.showReports = false
      } catch (err) {
        // console.log(err)
        this.$toast.fail('操作失败')
        this.showReports = false
      }
    }
  }
}
</script>

<style>
</style>
