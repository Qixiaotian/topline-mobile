import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './styles/login.less'
import VeeValidate, { Validator } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
// 引入格式化时间的处理函数
import { fmtDate } from '@/utils/dayjs'
Vue.use(Vant)
Vue.use(VeeValidate)
Validator.localize('zh_CN', zhCN)
Vue.config.productionTip = false
// 注册全局的过滤器
Vue.filter('fmtDate', fmtDate)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
