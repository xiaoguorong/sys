<template>
<!-- 组件：验证码 -->
    <div class="verification_code" @click="getCode">{{info}}</div>
</template>

<script>
export default {
	name: 'verification-code',
	props:{
		mobile:''
	},
	data () {
		return {
			info:'发送验证码'     //提示信息
		}
	},
	created(){
		
	},
	methods:{
		getCode(){
			if(!this.mobile){
				this.$toast( '手机号码不能为空','top');
				return;
			}
			const postData = {
				mobile:this.mobile
			}
			this.$axios.post("/user/get_mobile_code",postData).then((res)=>{
				if(res.code == 200){
					this.$toast("验证码获取成功",'top');
					let time = 200;
					let t = setInterval(()=>{
						time--;
						if(time == 0){
							this.info = '再次获取';
							clearInterval(t);
						}else{
							this.info = time + '秒后再试';
						}
					},1000)
				}
			})
		}
	}
 
}
</script>

<style scoped>
.verification_code{
	width:80px;
	height:28px;
	line-height:28px;
	text-align: center;
	line-height: 28px;
	border:1px solid #56A5E8;
	color:#56A5E8;
	border-radius: 6px;
}
</style>
