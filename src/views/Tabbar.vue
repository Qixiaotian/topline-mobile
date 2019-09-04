<template>
  <div>
    <div class="suo">
      <div class="top-nav">
        <van-icon name="wap-nav" class="icons" />
        <van-search
          class="seach"
          clearable
          show-action="true"
          v-model="value"
          placeholder="请输入搜索关键词"
        />
      </div>
    </div>

    <router-view class="view"></router-view>
    <van-tabbar v-model="active" active-color="#07c160" inactive-color="#000">
      <van-tabbar-item icon="home-o">主页</van-tabbar-item>
      <van-tabbar-item icon="chat">问答</van-tabbar-item>
      <van-tabbar-item icon="play-circle">视频</van-tabbar-item>
      <van-tabbar-item icon="manager">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  }
}
</script>
<style lang="less" scoped>
  .suo {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 1;
    .top-nav {
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #3194ff;
      .seach {
        width: 90%;
        border-radius: 15px;
        height: 35px;
        margin: 0 10px;
      }
      .icons {
        width: 10;
        font-size: 30px;
      }
    }
  }
  .view {
    margin-top: 50px;
  }
</style>
