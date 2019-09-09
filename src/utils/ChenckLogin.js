// 插件:就是一个对象,具有install(vue,options)
export default {
  install (Vue) {
    // 给vue实例增加一个方法 原型添加
    Vue.prototype.$checkLogin = function () {
      // 如果没有登录提示用户是否要进行登录
      if (!this.$store.state.user) {
        this.$dialog.confirm({
          title: '登录提示',
          message: '是否要跳转到登录页面'
        }).then(() => {
          // 成功之后进行跳转登录
          this.$router.push({
            path: '/login',
            query: {
              redirect: this.$route.fullPath
            }
          })
        }).catch(() => {

        })
        return false
      }
      return true
    }
  }
}
