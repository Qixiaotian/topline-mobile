<template>
  <div>
    <van-tabs title-active-color="#3194ff" animated color="#3194ff">
      <!-- 对数据进行页面加载 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
          <van-cell v-for="item in list" :key="item" :title="item" />
        </van-list>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入封装的api函数
import { getDdefaultOrUserChannel } from '@/api/channel'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      channels: []
    }
  },
  created () {
    // 调用展示
    this.loadChannels()
  },
  methods: {
    // 利用导入的请求函数发送请求渲染数据
    async loadChannels () {
      let data = await getDdefaultOrUserChannel()
      this.channels = data.channels
    },

    onLoad () {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true
        }
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
  }}
</style>