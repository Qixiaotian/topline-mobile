import Vue from 'vue'
import Router from 'vue-router'
import Tabbar from '@/views/Tabbar'
import Home from '@/views/home'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login.vue')
    },
    {
      path: '/search',
      name: 'search',
      component: () => import(/* webpackChunkName: "search" */ '../views/Search.vue')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import(/* webpackChunkName: "search" */ '../views/user-profile')
    },
    {
      path: '/follow',
      name: 'follow',
      component: () => import(/* webpackChunkName: "follow" */ '../views/follow')
    },
    {
      path: '/search-result/:q',
      name: 'search-result',
      props: true,
      component: () => import('../views/SearchResult.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      props: true,
      component: () => import('../views/detail/index.vue')
    },
    {
      path: '/',
      component: Tabbar,
      children: [
        {
          name: 'home',
          path: '',
          component: Home
        },
        {
          path: '/user',
          name: 'user',
          component: () => import('@/views/User.vue')
        }
      ]
    }

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
