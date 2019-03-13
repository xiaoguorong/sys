// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入axios
import Axios from 'axios'
Axios.defaults.baseURL = 'api/api';

// 添加一个请求拦截器
Axios.interceptors.request.use(function (config) {
  let token = window.localStorage.getItem("x-sys-token");
  if(token){
    config.headers['x-sys-token'] = token;
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 添加一个响应拦截器
Axios.interceptors.response.use(function (response) {
  // Do something with response data
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});


Vue.prototype.$axios = Axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
