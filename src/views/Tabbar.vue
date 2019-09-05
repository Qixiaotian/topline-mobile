<template>
  <div>
    <van-nav-bar title="黑马头条" fixed></van-nav-bar>
    <router-view class="view"></router-view>
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
      <van-tabbar-item icon="chat" to="qa">问答</van-tabbar-item>
      <van-tabbar-item icon="play-circle" to="video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager" to="/uesr">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less" scoped>
</style>
