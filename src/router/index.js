import Vue from 'vue'
import Router from 'vue-router'
import store from '../store';

Vue.use(Router)

var router = new Router({
    routes: [ 
		{
			path: '',
			component: ()=>import('@/views/layout/x-header'),
			children: [
				{//登录
					name: 'login',
					path: '/login',
					meta: {
						pageTitle: '登录',
						noLoginRequired: true
					},
					component: ()=>import('@/views/login')
				},
				{//找回密码
					name: 'findPassword',
					path: '/findPassword',
					meta: {
						pageTitle: '找回密码',
						noLoginRequired: true
					},
					component: ()=>import('@/views/find-password')
				},
			]
		},
		{
			path: '',
			component: ()=>import('@/views/layout/x-footer'),
			children: [{
				path: '',
				component: ()=>import('@/views/layout/x-header'),
				children: [
					{//首页
						name: 'index',
						path: '/',
						meta: {
							pageTitle: '首页',
							tabBar:'1'
						},
						component: ()=>import('@/views/index')
					}
				]
			},
			{
				path: '',
				component: ()=>import('@/views/layout/x-header-search'),
				children: [
					{//教材分类
						name: 'teachingMaterial',
						path: '/teachingMaterial',
						meta: {
							pageTitle: '教材',
							tabBar:'2'
						},
						component: ()=>import('@/views/teaching-material')
					},
				]
			},
			{
				path: '',
				component: ()=>import('@/views/layout/x-header-return'),
				children: [
					{//教材 classId:分类id name:教材分类名称 type:教师用书还是教材 
						name: 'teachingMaterialItem',
						path: '/teachingMaterial/item/:classId/:name/:type',
						meta: {
							pageTitle: '教材',
							tabBar:'2'
						},
						component: ()=>import('@/views/teaching-material/item')
					},
					{//教材 key:七牛key name:教材名字 title:七牛title
						name: 'teachingMaterialDetail',
						path: '/teachingMaterial/detail/:name/:key/:title',
						meta: {
							pageTitle: '教材',
							tabBar:2
						},
						component: ()=>import('@/views/teaching-material/detail')
					},
				]
			},
			{
				name: 'workbench',
				path: '/workbench',
				meta: {
					pageTitle: '工作台',
					tabBar:'2'
				},
				component: ()=>import('@/views/workbench')
			}
		]}
    ]
})

router.beforeEach((to, from, next) => {
    //更新机构id
    if(to.meta && to.meta.pageTitle){
      	store.dispatch("setHeaderName",to.meta.pageTitle)
    }
    //本地判断
	// 判断该路由是否需要登录权限
    if (!to.matched.some(record => record.meta && record.meta.noLoginRequired)){
		const token = window.localStorage.getItem('sys-token');
		//localStorage有token则视为登录
		if (token) {
			if (! store.state.token) {
				store.dispatch('setToken', token);
			}
			next();
			return;
		}
		//跳转到登录
		next({
			name: 'login',
			query: {redirect: to.fullPath} 
		});
		return;
    }
    next();
});

export default router
