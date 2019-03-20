<template>
	<!-- 工作台 -->
	<div class="workbench">
		<div class="header_exit pl2 pr2">
			<span class="title fl fz18 fw6">工作台</span>
			<span class="fr">退出</span>
		</div>
		<div class="report_form mt4 p2">
			<p class="fz14">我的报表</p>
			<ul class="date_tab d-flex fz14 mt1">
				<li class="active">今天</li>
				<li>本周</li>
				<li>本月</li>
			</ul>
			<ul class="crm_data d-flex mt2">
				<li>
					<p>1人</p>
					<p>招生录入</p>
				</li>
				<li>
					<p>1人</p>
					<p>招生录入</p>
				</li>
			</ul>
			<ul class="crm_data d-flex mt2">
				<li>
					<p>1人</p>
					<p>招生录入</p>
				</li>
				<li>
					<p>1人</p>
					<p>招生录入</p>
				</li>
			</ul>
		</div>
		<div class="application p2">
			<p class="fz14">我的应用</p>
			<ul class="d-flex mt1">
				<li class="mt1">
					<icon name="iconzhidaoshu-" class="fz38 application_icon"></icon>
					<p class="fw55">教材</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	name: 'workbench',
	data(){
		return{
			selected: 'tab-container1',
		}
	}

}
</script>

<style scoped>
.header_exit{
	top: 0;
    right: 0;
    left: 0;
    position: fixed;
    z-index: 1;
	line-height:40px;
}
.header_exit span:last-child{
	color:#0079fe;
}
.report_form,
.application{
	border-top:6px solid #efefef;
}
.mt4{
	margin-top:40px;
}
.date_tab{
	width:100%;
	border:1px solid #efefef;
	box-shadow:0 0 8px 1px #efefef;
}
.date_tab li{
	flex-grow:1;
	text-align: center;
	line-height: 26px;
	color:#000;
	background: #fff;
}
.date_tab .active{
	color:#fff;
	background: #0079fe;
}
.crm_data{
	flex-wrap:wrap
}
.crm_data li{
	box-shadow:0 0 8px 1px #efefef;
	flex-grow: 1;
	height:50px;
}
.crm_data li:nth-of-type(2n){
	margin-left:15px;
}
.crm_data li p{
	text-align: center;
	line-height: 25px;
}
.application ul{
	flex-wrap:wrap;
}
.application li{
	width:25%;
	height:60px;
	text-align: center;
}
.application li p:last-child{
	line-height:25px;
}
.application_icon{
	color:#0079fe
}
</style>
