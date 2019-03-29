<template>
	<div class="teaching_material_detail">
		<div class="pdf_header d-flex">
			<span class="pdf_name pl2">{{$route.params.title}}</span>
			<span class="pdf_page">{{pageNum}}/{{numPages}}</span>
			<span class="pdf_download pr2"></span>
			<span class="pdf_download pr2">
				<icon class="fz14" name="iconxiazai1"></icon>
			</span>
		</div>
		<div class="pdf_box">
			<pdf 
				v-for="i in numPages"
				:key="i"
				:src="pdfUrl"
				:page="i"
				>
			</pdf>
		</div>
	</div>
</template>
<script>
import pdf from 'vue-pdf'
import {mapActions} from 'vuex'
export default {
	name: 'teaching-material-detail',
	components:{
		pdf
	},
	data(){
		return {
			pdfUrl:"",
			pageNum:1,
			pageTotalNum:1,
			numPages:1,
		}
	},
	created(){
		this.setHeaderName(this.$route.params.name)
		this.pdfUrl = "http://static.solearn.cn/"+this.$route.params.key;
		this.pdfTask(this.pdfUrl);
	},
	mounted(){
	},
	methods: {
		...mapActions(["setHeaderName"]),
		pdfTask(pdfUrl){
			var self = this
			var loadingTask = pdf.createLoadingTask(pdfUrl)  
				loadingTask.then(pdf => {
				self.pdfUrl = loadingTask
				self.numPages = pdf.numPages
			}).catch((err) => {
				console.error('pdf加载失败')
			})
		},
		
  	}
}
</script>		

<style scoped>
.pdf_header{
	background:rgb(0, 0, 0,1);
	color:#fff;
	line-height:44px;
	border-top:6px solid #efefef;
	position: fixed;
	top:40px;
	z-index:1;
}
.pdf_name{
	width:40vw;
	box-sizing: border-box;
}
.pdf_page{
	width:20vw;
	text-align: center
}
.pdf_download{
	width:40vw;
	text-align: right;
	box-sizing: border-box;
}
.pdf_box{
	margin-top:84px;
}
</style>

