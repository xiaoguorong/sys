<template>
<!-- 不带搜索的顶部 -->
	<div class="footer fw55">
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="1">
				<icon name="icontubiao-" class="fz24"></icon>
				<p class="mt05 fz12">首页</p>
			</mt-tab-item>
			<mt-tab-item id="2">
				<icon name="icongongzuotai" class="fz24"></icon>
				<p class="mt05 fz12">工作台</p>
			</mt-tab-item>
			<mt-tab-item id="3">
				<icon name="iconwode" class="fz24"></icon>
				<p class="mt05 fz12">我的</p>
			</mt-tab-item>
		</mt-tabbar>
	</div>
</template>

<script>
export default {
	name: "x-footer",
	data() {
		return {
			selected:'1'
		};
	},
	created(){
		console.log(this.$route)
		console.log(this.$route.meta.tabBar)
		if(this.$route.meta && this.$route.meta.tabBar){
			this.selected = this.$route.meta.tabBar;
		}
	},
	watch:{
		selected(nval){
			console.log(nval)
			if(nval == '1'){
				this.$router.push({name:'index'})
			}else if(nval == '2'){
				this.$router.push({name:'workbench'})
			}else if(nval == '3'){
				this.$router.push({name:'index'})
			}
		}
	}
};
</script>

<style scoped>

</style>
