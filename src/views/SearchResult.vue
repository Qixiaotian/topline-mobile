<template>
  <div>
  <!-- 头部结构 点击图标进行返回 -->
   <van-nav-bar
    title="搜索结果"
    left-text="返回"
    left-arrow
    fixed
   @click-left="$router.back()"
   />
   <!-- 列表渲染 -->
   <van-list
      v-model="loading"
      :finished="finished"
       finished-text="没有更多了"
      @load="onLoad"
    >
    <!-- 里面的列表内容 -->
      <van-cell
        v-for="article in list"
        :key="article.art_id.toString()"
        :title="article.title"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '../api/search'
export default {
  name: 'SearchResult',
  props: ['q'],
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      per_page: 10

    }
  },
  methods: {
    async  onLoad () {
      // 异步更新数据
      try {
        // 传递参数发送请求保存
        const data = await getSearchResults({
          page: this.page,
          per_page: this.per_page,
          q: this.q
        })
        // 请求过来的的结果push到数组中去
        this.list.push(...data.results)
        this.page++
        this.loading = false
        // 当文章加载完毕的时候进行显示
        if (data.results.length === 0) {
          this.finished = true
        }
      } catch (err) {
        this.$toast.fail('获取搜索结果失败')
      }
    }
  } }
</script>

<style lang="less" >
.van-list {
  margin-top: 46px;
}
</style>
