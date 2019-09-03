<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field  left-icon="phone" right-icon="question-o" placeholder="请输入手机号" />
      <van-field   placeholder="请输入手机号" left-icon="lock">
         <van-button slot="button" size="small" type="default" class="send-btn">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="click-btn">
      <van-button type="info" size="large">登录</van-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>
<style lang="less" scoped>
.send-btn{
  background-color:#ededed;
  border-radius: 40px
}
  .click-btn{
     padding: 20px;
  }
</style>
