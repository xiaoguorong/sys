<template>
<!-- 带搜索的顶部 -->
	<div class="header_search pl2 pr2">
		<span class="title fl fz18 fw6">{{headerName}}</span>
		<div class="fr">
			<icon name="iconsousuo1" class="fz24 fw6 icon_search"></icon>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "x-header-search",
	data(){
		return{
			value:''
		}
	},
	computed: {
		...mapState({
			headerName: state => state.headerName
		})
	}
};
</script>

<style scoped>
.header_search{
	top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1;
}
.header_search span{
	line-height:40px;
}
.header_search .icon_search{
	margin-top:8px;
	color:#0079fe;
}
.search{
	position: fixed;
	top:0;
	left:0;
	width:100%;
}
</style>
