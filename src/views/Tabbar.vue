<template>
  <div>
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="chat" to="qa">问答</van-tabbar-item>
      <van-tabbar-item icon="play-circle" to="video">视频</van-tabbar-item>
      <!-- 通过在仓库的存储的user判断是否存在显示我的还是未登录状态 -->
      <van-tabbar-item icon="manager" to="/user" >{{user?'我的':'未登录'}}</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Tabbar',
  computed: {
    ...mapState(['user'])
  },
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less" scoped>
</style>
