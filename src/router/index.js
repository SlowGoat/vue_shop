import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/', 
    redirect: '/login'
  },
  {
    path: '/login', 
    component: Login
  },
  {
    path: '/home', 
    component: Home
  }
]

const router = new VueRouter({
  routes
})

//路由守卫配置
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数，表示放行  用法一：next()放行   用法二：next('/login')强制跳转

  //如果用户访问登录页，直接放行
  if(to.path === '/login') return next()
  //从 sessionStorage中获取保存的token值
  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()
})

export default router
