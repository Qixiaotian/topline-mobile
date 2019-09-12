<template>
  <div>
      <div class="not-login" v-if="!user">
      <div class="circle" @click="handleLogin">
        <span>登录</span>
      </div>
    </div>
        <div  v-else>
      <van-cell-group class="user-info" >
        <van-cell class="base-info" is-link :border="false">
          <div slot="title">
            <img class="avatar" :src="userInfo.photo" alt="">
            <span class="title">{{userInfo.name}}</span>
            <div class="day">
              <div>今日阅读</div>
              <div></div>
            </div>
          </div>
        </van-cell>
        <van-grid class="data-info" :border="false"  >
          <van-grid-item>
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </van-grid-item>
          <van-grid-item>
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">获赞</span>
          </van-grid-item>
        </van-grid>
      </van-cell-group>
      <van-cell-group >
        <van-grid clickable :column-num = '3'  >
          <van-grid-item icon="star-o"  text="收藏" />
          <van-grid-item icon="clock-o" text="历史"/>
          <van-grid-item icon="label-o" text="作品"/>
        </van-grid>
      </van-cell-group>
      <van-cell-group>
        <van-cell title="消息通知" is-link />
        <van-cell title="用户反馈" is-link />
        <van-cell title="小智同学" is-link />
        <van-cell title="系统设置" is-link to="/settings" />
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'User',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    // 点击的时候进行记录信息
    handleLogin () {
      this.$router.push({
        path: '/login',
        query: {
          redirect: this.$route.fullPath
        }
      })
    },
    // 发送请求获取用户信息
    async  getUser () {
      // 判断是否登陆
      if (!this.$checkLogin()) {
        return
      }
      try {
        let data = await getUserInfo()
        this.userInfo = data
      } catch (err) {
        this.$toast.fail('获取信息失败')
      }
    }
  },
  created () {
    this.getUser()
  }
}
</script>

<style lang="less" scoped>
.not-login {
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  .circle {
    width: 50px;
    height: 50px;
    padding: 20px;
    background-color: red;
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 20px;
  }
}
.user-info {
  .base-info {
    height: 120px;
    display: flex;
    align-items: center;
    background-color: #0096fa;
    div {
      display: flex;
      align-items: center
    }
    .avatar {
      margin-left: 25px;
      width: 70px;
      height: 70px;
      border-radius: 100%;
    }
    .title{
      color: #fff;
      margin-left: 20px;
      font-size: 20px;
    }
  }
  .data-info {
    color: #fff;
    .text {
      font-size: 16px;
    }
    .count {
      margin-bottom: 5px;
      font-size: 16px;
    }
  }
  /deep/ .van-cell__right-icon {
    color: #fff
  }
  /deep/ .van-grid-item__content {
    background-color: #0096fa;
  }
}
</style>
