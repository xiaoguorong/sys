<template>
	<div class="index">
		我是首页
		<button @click="clearToken">退出登录</button>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'index',
	data () {
		return {

		}
	},
	created(){
		this.$axios.post("/index/index").then((res)=>{
			console.log(res)
		})
		
	},
	methods:{
		...mapActions(['clearToken']),
		
	},
}
</script>

<style scoped>

</style>
