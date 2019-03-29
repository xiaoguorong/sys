// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入axios
import Axios from './axios'
Vue.prototype.$axios = Axios;

//引入mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css' 
Vue.use(Mint)

//引入vuex
import store from './store';

//引入less
import '@/less/util.less';
import '@/less/reset.less';
import '@/less/mint-ui.less';

//引入全局组件
import Icon from '@/components/x-icon'
import Footer from '@/components/x-footer'
Vue.component("icon",Icon)
Vue.component("xFooter",Footer)

//引入弹窗
import { Toast } from 'mint-ui';
//简化
Vue.prototype.$toast = (msg,pos)=>{
	return Toast({
		message: msg,
		position: pos
	})
};

//引入loading
import { Indicator } from 'mint-ui';
Vue.prototype.$indicator = Indicator;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
	router,
	components: { App },
	template: '<App/>'
})
