<template>
  <div>
    <van-tabs title-active-color="#3194ff" animated color="#3194ff" v-model="activeIndex">
      <!--  添加图标标签 -->
      <!-- vant的下拉加载 -->
      <van-icon slot="nav-right" name="wap-nav" class="nav-btn" @click="showChannelEdit=true" />
      <!-- 对数据进行页面加载 -->
      <van-tab v-for="channel in channels" :title="channel.name" :key="channel.id">
        <van-pull-refresh
          :success-text="successText"
          v-model="currentChannel.pullLoading"
          @refresh="onRefresh"
        >
          <van-list
            v-model="currentChannel.loading"
            :finished="currentChannel.finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <!--  每一项列表显示的内容 -->
            <van-cell
              v-for="article in currentChannel.articles"
              :key="article.art_id.toString()"
              :title="article.title"
            >
              <!--  利用插槽编辑说明的那个位置 -->
              <div slot="label">
                <!-- grid 显示封面
                  article.cover.type   0 没有图片   1 1个图片 3 3个图片
                -->
                <van-grid v-if="article.cover.type" :border="false" :column-num="3">
                  <van-grid-item v-for="(img, index) in article.cover.images" :key="img + index">
                    <van-image lazy-load height="80" :src="img">
                      <!-- Image组件提供了默认的加载中提示，支持通过loading插槽自定义内容 -->
                      <template v-slot:loading>
                        <van-loading type="spinner" size="20" />
                      </template>
                      <!-- Image组件提供了默认的加载失败提示，支持通过error插槽自定义内容 -->
                      <template v-slot:error>加载失败</template>
                    </van-image>
                  </van-grid-item>
                </van-grid>
                <!-- 底下文字区域 接口相对应的数据-->
                <p>
                  <!-- 作者的名字 -->
                  <span>{{ article.aut_name }}</span>&nbsp;
                  <!-- 评论的数量 -->
                  <span>{{ article.comm_count }}评论</span>&nbsp;
                  <!-- 发布的时间  由于时间需要进行处理dayjs -->
                  <span>{{ article.pubdate |fmtDate}}</span>&nbsp;
                  <!-- 右侧的图标 -->
                  <van-icon name="cross" class="close" @click="handleAction(article)" />
                </p>
              </div>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <more-action
      v-model="showDialog"
      :article="currentArticle"
      v-if="currentArticle"
      @handlesuccess="handlesuccess"
    ></more-action>
    <!--  使用编辑组建 -->
    <channel-edit v-model="showChannelEdit"></channel-edit>
  </div>
</template>

<script>
// 导入封装的api函数
import { getDdefaultOrUserChannel } from '@/api/channel'
import { getArticles } from '@/api/article'
import MoreAction from '@/views/home/components/MoreAction'
// 导入弹层
import ChannelEdit from '@/views/home/components/ChannelEdit'
// 导入vue利用vant里面的一个懒加载实现图片加载的功能
import { getItem, setItem } from '@/utils/localStorage'
import Vue from 'vue'
import { Lazyload } from 'vant'
Vue.use(Lazyload)
export default {
  components: {
    MoreAction,
    // 注册编辑组建
    ChannelEdit
  },
  data () {
    return {
      // list: [],
      // loading: false,
      // finished: false,
      successText: '',
      channels: [],
      activeIndex: 0,
      showDialog: false,
      currentArticle: null,
      // 控制弹层的显示隐藏
      showChannelEdit: false
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
    // 接收子组件传过来的值
    handlesuccess () {
      // 关闭弹层
      this.showDialog = false
      const index = this.currentChannel.articles.findIndex(article => {
        return article.art_id === this.currentArticle.art_id
      })
      this.currentChannel.articles.splice(index, 1)
    },
    // 利用导入的请求函数发送请求渲染数据

    async loadChannels () {
      try {
        // let data = await getDdefaultOrUserChannel()
        //  如果用户登录过就发送请求--》这个过程中说明是每个用户都有自己的一个数据库进入数据库里面找属于自己的一些数据
        let channels = []
        if (this.$store.state.user) {
          let data = await getDdefaultOrUserChannel()
          channels = data.channels
        } else {
          // 如果不是用户登录首先在本地存储中找相关的数据
          channels = getItem('channels')
          // 本地数据中找不到信息要请求新的数据进行数据频道列表渲染
          if (!channels) {
            const data = await getDdefaultOrUserChannel()
            channels = data.channals
            setItem('channels', channels)
          }
        }
        channels.forEach(channel => {
          channel.timestamp = null
          channel.articles = []
          channel.loading = false
          channel.finished = false
          channel.pullLoading = false
        })
        this.channels = channels
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
    async onRefresh () {
      try {
        const data = await getArticles({
          // 频道的id
          channel_id: this.currentChannel.id,
          // 时间戳
          timestamp: Date.now(),
          // 是否包含置顶1，0不包含
          with_top: 1
        })
        this.currentChannel.pullLoading = false
        this.currentChannel.articles.unshift(...data.results)
        this.successText = `加载了${data.results.length}条数据`
      } catch (err) {
        console.log(err)
      }
    },
    handleAction (article) {
      this.showDialog = true
      this.currentArticle = article
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
      right: 10px;
      z-index: 100;
    }
    /deep/ .van-tabs__content {
      margin-top: 90px;
      margin-bottom: 50px;
    }
  }
  .close {
    float: right;
  }
  .nav-btn {
    position: fixed;
    right: 10px;
    line-height: 44px;
    background-color:#fff;
    opacity: 0.9;
    font-size: 22px;
  }
</style>
