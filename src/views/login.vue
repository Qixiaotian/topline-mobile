<template>
  <div>
    <van-nav-bar title="登录" />
    <van-cell-group>
      <van-field
        v-validate="{required:true,regex:/^1[3456789]\d{9}$/}"
        name="mobile"
        :error-message="errors.first('mobile')"
        v-model="user.mobile"
        left-icon="phone"
        right-icon="question-o"
        placeholder="请输入手机号"
      />
      <van-field
        v-validate="'required|digits:6'"
        name="code"
        :error-message="errors.first('code')"
        v-model="user.code"
        placeholder="请输入手机号"
        left-icon="lock"
      >
        <van-button slot="button" size="small" type="default" class="send-btn">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="click-btn">
      <van-button type="info" size="large" @click="loginFun" :loading="loading">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      loading: false,
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {

    ...mapMutations(['setPush']),
    async loginFun () {
      this.loading = true
      try {
        let valid = await this.$validator.validate()
        if (!valid) {
          this.loading = false
          return
        }
        let res = await login(this.user)
        // 接收的查询字符串如果接收值存在的话进行登录调转,如果不存在的话进行跳转到首页
        this.$router.push(this.$route.query.redirect || '/')
        // this.$store.commit('setPush', res)
        this.setPush(res)
        this.$toast.success('登陆成功')
        this.loading = false
      } catch (err) {
        console.log(err)
        this.$toast.fail('登陆失败')
      }
      this.loading = false
    }
  },
  created () {
    const dict = {
      custom: {
        mobile: {
          required: '请输入手机号码',
          regex: '请输入正确格式的手机号码'
        },
        code: {
          required: '请输入验证码',
          digits: '请输入的号码是6为数字'
        }
      }
    }
    this.$validator.localize('dict', dict)
  }
}
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
