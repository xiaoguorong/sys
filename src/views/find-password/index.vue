<template>
  <!-- 找回密码页面 -->
	<div class="find_password">
		<div class="pass_process">
			<span :class="{'blue':process}">1.验证手机号码</span>
			<icon name="iconiconfontjiantou" class="icon_jiantou"></icon>
			<span :class="{'blue':!process}">2.设置新密码</span>
		</div>
		<div class="info_box p2" v-if="process">
			<div class="mobile">
				<icon name="iconshouji" class="fz20 mobile_icon fl mt1"></icon>
				<input type="tel" v-model="mobile" placeholder="请输入注册手机号" class="mobile_input fl">
			</div>
			<div class="code">
				<icon name="iconmima" class="fz20 code_icon fl mt1"></icon>
				<input type="text" v-model="code" placeholder="请输入短信验证码" class="code_input fl">
				<verification-code class="code_box fr" :mobile="mobile"></verification-code>
			</div>
			<mt-button type="primary" size="large" @click.native="next" class="mt3">下一步</mt-button>
		</div>
		<div class="info_box p2" v-else>
		<div class="password">
			<icon name="iconmima" class="fz20 mobile_icon fl mt1"></icon>
			<input
			type="password"
			v-model="password"
			placeholder="请输入6-20新的登录密码"
			class="mobile_input fl"
			>
		</div>
		<div class="password repassword">
			<icon name="iconmima" class="fz20 password_icon fl mt1"></icon>
			<input
			type="password"
			v-model="rePassword"
			placeholder="请再次输入登录密码"
			class="password_input fl"
			>
		</div>
		<mt-button type="primary" size="large" @click.native="savePassword" class="mt3">提交</mt-button>
		</div>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import verificationCode from "@/components/verification-code";
export default {
	name: "find-password",
	data() {
		return {
			mobile: "", //手机号码
			password: "", //密码
			rePassword: "", //验证密码
			code: "", //验证码
			process: true //进度是否在验证验证码
		};
	},
	methods: {
		next() {
			if (!this.mobile) {
				this.$toast("手机号码不能为空", "top");
				return;
			}
			var mobilereg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!mobilereg.test(this.mobile)) {
				this.$toast("手机号码格式不正确", "top");
                return;
            }
			if (!this.code) {
				this.$toast("验证码不能为空", "top");
				return;
			}
			const postData = {
				mobile: this.mobile,
				code: this.code
			};
			this.$axios.post("/user/check_mobile_code", postData).then(res => {
				if (res.code == 200) {
					this.$toast("验证成功", "top");
					this.process = false;
				}
			});
		},
		savePassword(){
			if(!this.password){
				this.$toast("密码不能为空", "top");
				return;
			}
			if(this.password.length < 6){
				this.$toast("密码格式不正确", "top");
				return;
			}
			if(!this.rePassword){
				this.$toast("请再次输入密码", "top");
				return;
			}
			if(this.password != this.rePassword){
				this.$toast("两次输入的密码不一致", "top");
				return;
			}
			const postData = {
				mobile: this.mobile,
				password: this.password
			};
			this.$axios.post("/user/change_password", postData).then(res => {
				if (res.code == 200) {
					this.$toast("密码修改成功", "top");
					this.process = false;
					this.$router.push({name:'login'})
				}
			});
		}
	},
	components: {
		verificationCode
	}
};
</script>

<style scoped>
.pass_process {
	display: flex;
	border-bottom: 1px solid #efefef;
}
.pass_process span {
	width: 50%;
	text-align: center;
	color: #666;
	line-height: 36px;
}
.icon_jiantou {
	font-size: 36px;
	color: #efefef;
}
.login {
  	padding-top: 60px;
}
.info_box {
  	line-height: 40px;
}
.mobile,
.password,
.code {
	border: 1px solid #efefef;
	box-sizing: border-box;
	overflow: hidden;
}
.code,
.repassword {
  	border-top: none;
}
.password_input,
.code_input,
.mobile_input {
	outline: none;
	border: none;
	height: 40px;
	width: 85%;
}
.code_input {
  	width: 50%;
}
.code_icon,
.password_icon,
.mobile_icon {
	width: 15%;
	color: #999;
}
.find_pass {
  	color: #999;
}
.code_box {
	margin-top: 6.5px;
	margin-right: 6.5px;
}
.pass_process span{
	font-size: 14px;
}
.pass_process .blue {
  	color: #56a5e8;
}
</style>
