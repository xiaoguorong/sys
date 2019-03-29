<template>
<!-- 教材页面 -->
	<div class="teaching_material_item">
		<ul class="pl1 pr15 pt1">
			<router-link :to="{name:'teachingMaterialDetail',params:{name:item.class_name,key:item.qnkey,title:item.title}}" v-for="(item,index) in data" :key="index">
				<li class="mt1 d-flex">
					<div class="pic"></div>
					<div class="ml1 detail">
						<p class="fw55">{{item.class_name}}</p>
						<p>
							<icon name="icondeng" class="icon_deng"></icon>
							<span class="ml2 fw55">200次浏览</span>
							<span class="fr">200人正在学</span>
						</p>
					</div>
				</li>
			</router-link>
		</ul>
	</div>
</template>

<script>
import { mapState,mapActions } from "vuex";
export default {
	name: "teaching-material-item",
	data(){
		return{
			selected:'1', //选择教师用书还是教材课件，默认教师用书
			data:[]
		}
	},
	created(){
		this.setHeaderName(this.$route.params.name)
		this.getData();
	},
	methods:{
		...mapActions(["setHeaderName"]),
		getData(){
			const postData = {
				class_id:this.$route.params.classId
			}
			if(this.$route.params.type == '1'){
				this.$axios.post('/teaching_material/teacher_book',postData).then((res)=>{
					this.data = res.content;
					console.log(this.data)
					// this.data.forEach((e)=>{
					// 	e.cover = 'http://admin.com' + e.cover;
					// })
				})
			}else{
				console.log("01")
				this.$axios.post('/teaching_material/teaching_material',postData).then((res)=>{
					this.data = res.content;
					console.log(this.data)
					// this.data.forEach((e)=>{
					// 	e.cover = 'http://admin.com' + e.cover;
					// })
				})
			}
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
.teaching_material_item{
	border-top:5px solid #efefef;
}
.teaching_material_item li{
	width:100%;
	padding-bottom:12px;
	border-bottom:1px solid #efefef;
}
.pic{
	width:36vw;
	height:10vh;
	background: red;
	border-radius: 6px;
}
.teaching_material_item p:first-of-type{
	line-height:5vh;
	letter-spacing:2px
}
.teaching_material_item p:last-of-type{
	line-height:5vh;
	position: relative;
	margin-left:-3px;
}
.icon_deng{
	position: absolute;
	color:orange;
	font-size:20px;
	top: 50%;
    margin: -10px 0 0 0;
}
.detail{
	flex-grow:1;
}
</style>
