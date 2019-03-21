import Vue from 'vue'
import Axios from 'axios'
import store from './../store'
import router from './../router'
Axios.defaults.timeout = '6000';
Axios.defaults.baseURL = 'api/api/sys';
// 添加一个请求拦截器
Axios.interceptors.request.use(function (config) {
    Vue.$indicator.open({ spinnerType: 'fading-circle' });//显示加载图标
    if (store.state.token) {
      	config.headers['sys-token'] = store.state.token;
    }
    if (store.state.orgId) {
      	config.headers['sys-orgid'] = store.state.orgId;
    }
    if (store.state.camId) {
      	config.headers['sys-camid'] = store.state.camId;
	}
	if (store.state.isAdmin) {
		config.headers['sys-is-admin'] = store.state.isAdmin;
	}
    return config;
}, function (error) {
  	return Promise.reject(error);
});

// 添加一个响应拦截器
Axios.interceptors.response.use(function (response) {
	Vue.$indicator.close();//关闭加载图标
	//如果返回的不是200，弹出返回信息
	if (response.data.code != 200) {
		Vue.$toast({
			message: response.data.msg,
			position: 'top'
		});
		//返回304表示未登录
		if (response.data.code == 304) {
			router.push({ name: 'login' })
		}
	}
	if(response.data.token_info && response.data.token_info.sys_refresh_token == 1){
		store.dispatch('setToken',response.data.token_info.sys_token);
	}
	return response.data;
}, function (error) {
  	return Promise.reject(error);
});

export default Axios;