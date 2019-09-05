<template>
  <div>
    <van-tabs title-active-color="#3194ff" animated color="#3194ff" v-model="activeIndex">
      <!-- 对数据进行页面加载 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <van-pull-refresh v-model="currentChannel.pullLoading" @refresh="onRefresh">
        <van-list
          v-model="currentChannel.loading"
          :finished="currentChannel.finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <van-cell
            v-for="article in currentChannel.articles"
            :key="article.art_id.toString()"
            :title="article.title"
          />
        </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入封装的api函数
import { getDdefaultOrUserChannel } from '@/api/channel'
import { getArticles } from '@/api/article'
export default {
  data () {
    return {
      // list: [],
      // loading: false,
      // finished: false,
      channels: [],
      activeIndex: 0
    }
  },
  computed: {
    currentChannel () {
      return this.channels[this.activeIndex]
    }
  },
  created () {
    // 调用展示
    this.loadChannels()
  },
  methods: {
    // 利用导入的请求函数发送请求渲染数据

    async loadChannels () {
      try {
        let data = await getDdefaultOrUserChannel()
        data.channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          channel.loading = false
          channel.finished = false
          channel.pullLoading = false
        })
        this.channels = data.channels
      } catch (err) {
        console.log(err)
      }
    },

    async onLoad () {
      // 异步更新数据
      const data = await getArticles({
        channel_id: this.currentChannel.id,
        timestamp: this.currentChannel.timestamp || Date.now(),
        with_top: 1
      })
      this.currentChannel.timestamp = data.pre_timestamp
      this.currentChannel.articles.push(...data.results)
      this.currentChannel.loading = false
      if (data.results.length === 0) {
        this.currentChannel.finished = true
      }
    },
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.currentChannel.pullLoading = false
      }, 500)
    }

  }
}
</script>

<style lang="less" scoped>
  .van-tabs {
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
      left: 0;
      z-index: 100;
    }
    /deep/ .van-tabs__content {
      margin-top: 90px;
      margin-bottom: 50px;
    }
  }
</style>
