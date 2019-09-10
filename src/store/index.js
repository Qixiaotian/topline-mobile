import Vue from 'vue'
import Vuex from 'vuex'
import * as storageTools from '@/utils/localStorage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: storageTools.getItem('user'),
    // 设置默认的显示
    showReplyList: false,
    //  传递当前评论的信息
    currentComment: null

  },
  mutations: {
    setPush (state, user) {
      state.user = user
      storageTools.setItem('user', user)
    },
    // 设置提交的方法将状态传给仓库里面
    setShowReplyList (state, isShow) {
      state.showReplyList = isShow
    },
    //  设置传给当前的评论的数据方法
    setCurrentComment (state, comment) {
      state.currentComment = comment
    }
  },
  actions: {

  }
})
