<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        left-icon="phone"
        right-icon="question-o"
        placeholder="请输入手机号"
      />
      <van-field v-model="user.code" placeholder="请输入手机号" left-icon="lock">
        <van-button slot="button" size="small" type="default" class="send-btn">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="click-btn">
      <van-button type="info" size="large" @click="loginFun">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '../api/user'
export default {
  data () {
    return {
      user: {
        mobile: '139111111111',
        code: '246810'
      }
    }
  },
  methods: {
    async loginFun () {
      try {
        let res = await login(this.user)
        // this.$router.push('./home')
        console.log(res)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }
    }
  } }
</script>
<style lang="less" scoped>
  .send-btn {
    background-color: #ededed;
    border-radius: 40px;
  }
  .click-btn {
    padding: 20px;
  }
</style>
