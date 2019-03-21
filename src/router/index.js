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
				{//首页
					name: 'index',
					path: '/',
					meta: {
						header: {
							pageTitle: '首页'
						},
					},
					component: ()=>import('@/views/index')
				},
				{//登录
					name: 'login',
					path: '/login',
					meta: {
						header: {
							pageTitle: '登录'
						},
						noLoginRequired: true
					},
					component: ()=>import('@/views/login')
				},
				{//找回密码
					name: 'findPassword',
					path: '/findPassword',
					meta: {
						header: {
							pageTitle: '找回密码'
						},
						noLoginRequired: true
					},
					component: ()=>import('@/views/find-password')
				},
			]
		},
		{
			path: '',
			component: ()=>import('@/views/layout/x-header-search'),
			children: [
				{//教材
					name: 'teachingMaterial',
					path: '/teachingMaterial',
					meta: {
						header: {
							pageTitle: '教材'
						},
					},
					component: ()=>import('@/views/teaching-material')
				},
			]
		},
		{
			path: '',
			component: ()=>import('@/views/layout/x-header-return'),
			children: [
				{//教材 classId:分类id type:教师用书还是教材 
					name: 'teachingMaterialItem',
					path: '/teachingMaterial/item/:classId/:type',
					meta: {
						header: {
							pageTitle: '教材'
						},
					},
					component: ()=>import('@/views/teaching-material/item')
				},
				{//教材 classId:分类id id:具体id
					name: 'teachingMaterialDetail',
					path: '/teachingMaterial/detail/:classId/:id',
					meta: {
						header: {
							pageTitle: '教材'
						},
					},
					component: ()=>import('@/views/teaching-material/detail')
				},
			]
		},
		{
			name: 'workbench',
			path: '/workbench',
			meta: {
				header: {
					pageTitle: '工作台'
				},
			},
			component: ()=>import('@/views/workbench')
		}
    ]
})

router.beforeEach((to, from, next) => {
    //更新机构id
    console.log(to)
    if (to.query.orgid) {
		console.log(`更新机构id>>${to.query.orgid}`);
		store.dispatch("setOrgId",to.query.orgid)
    }
    if(to.meta.header && to.meta.header.pageTitle){
      	store.dispatch("setHeaderName",to.meta.header.pageTitle)
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
