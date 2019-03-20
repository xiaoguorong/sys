<template>
<!-- 教材页面 -->
	<div class="teaching_material">
		<div class="navbar">
			<mt-navbar v-model="selected" class="ml05">
				<mt-tab-item id="1">教师用书</mt-tab-item>
				<mt-tab-item id="2">教材课件</mt-tab-item>
			</mt-navbar>
		</div>
		<ul class="teaching_material_list">
			<li class="fl" v-for="(item,index) in data" :key="index" :style="{backgroundImage:'url('+item.cover+')'}">
				<div class="line" v-if="index%3 == 0"></div>
			</li>
		</ul>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	name: "teaching-material",
	data(){
		return{
			selected:'1', //选择教师用书还是教材课件，默认教师用书
			data:[]
		}
	},
	created(){
		this.getData();
	},
	methods:{
		getData(){
			this.$axios.post('/teachingmaterial/teacher_book_index').then((res)=>{
				this.data = res.content;
				this.data.forEach((e)=>{
					e.cover = 'http://admin.com' + e.cover;
				})
			})
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
.navbar{
	width:150px;
}
.teaching_material_list{
	border-top:6px solid #efefef;
	margin-top:3px;
	padding:2vw;
	overflow: hidden;
}
.teaching_material_list li{
	border-radius: 10px;
	height:22vh;
	width:28vw;
	background: #efefef;
	margin: 2vh 2vw;
	position: relative;
	background-size: cover;
	box-shadow: 0px 2px 8px#efefef;
}
.line{
	width:96vw;
	height:2.6vw;
	border:1px solid #efefef;
	box-shadow: 0px -5px 8px#efefef;
	position: absolute;
	bottom:-26vh;
	top:0;
	right:0;
	left:-2vw;
	margin:auto;

}
</style>
