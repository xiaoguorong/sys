import Vue from 'vue'
import Router from 'vue-router'
const Login = ()=>import('@/views/login');
const Index = ()=>import('@/views/index');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
