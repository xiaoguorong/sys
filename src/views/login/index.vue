<template>
    <!-- 登录页面 -->
    <div class="login p2">
		<h2 class="t-center">语商管理系统</h2>
		<div class="info_box">
        <div class="mobile">
			<icon name="iconshouji" class="fz20 mobile_icon fl mt1"></icon>
			<input type="tel" v-model="mobile" placeholder="手机号码" class="mobile_input fl">
        </div>
        <div class="password">
			<icon name="iconmima" class="fz20 password_icon fl mt1"></icon>
			<input type="password" v-model="password" placeholder="登录密码" class="password_input fl">
        </div>
      </div>
      <mt-button type="primary" size="large" @click.native="login" class="mt3">登录</mt-button>
      <span class="fr fz12 mt2 find_pass" @click="findPassword">找回密码</span>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	name: "login",
	data() {
		return {
			mobile: "", //手机号码
			password: "" //密码
		};
	},
	methods: {
		...mapActions(["setToken", "setCamId","setAuthList","setAuthApi","setOrgId"]),
		login() {
			if (!this.mobile) {
				this.$toast("手机号码不能为空", "top");
				return;
			}
			var mobilereg=/^[1][3,4,5,7,8][0-9]{9}$/;
            if (!mobilereg.test(this.mobile)) {
				this.$toast("手机号码格式不正确", "top");
                return;
            }
			if (!this.password){
				this.$toast("登录密码不能为空", "top");
				return;
			}
			let postData = {
				mobile: this.mobile,
				password: this.password
			};
			this.$axios.post("/user/login", postData).then(res => {
				if (res.code == 200) {
					this.$toast("登录成功", "top");
					let token = res.token_info.sys_token;
					this.setToken(token);
					let sys_refresh_token = res.token_info.sys_refresh_token;
					let campus_is_admin = res.token_info.campus_is_admin;
					let campus_num = res.token_info.campus_num;
					window.localStorage.setItem("sys-refresh-token", sys_refresh_token);
					window.localStorage.setItem("sys-campus-is-admin", campus_is_admin);
					window.localStorage.setItem("sys-campus-num", campus_num);
					if (res.token_info.camid) {
						let camid = res.token_info.camid;
						let orgid = res.token_info.orgid;
						this.setCamId(camid);
						this.setOrgId(orgid);
					}
					//获取权限
					this.$axios.post("/member/get_member_auth").then((res)=>{
						this.setAuthList(res.content.auth_ids)
					})
					//获取权限表
					this.$axios.post("/campus/get_menu_campus_api").then((res)=>{
						this.setAuthApi(JSON.stringify(res.content))
					})
					this.$router.push({ name: "index" });
				}
			});
		},
		findPassword() {
			this.$router.push({ name: "findPassword" });
		}
	}
};
</script>

<style scoped>
.login {
  	padding-top: 60px;
}
.info_box {
	line-height: 40px;
	margin-top: 35px;
}
.mobile,
.password {
	border: 1px solid #efefef;
	box-sizing: border-box;
	overflow: hidden;
}
.password {
  	border-top: none;
}
.password_input,
.mobile_input {
	outline: none;
	border: none;
	height: 40px;
	width: 85%;
}
.password_icon,
.mobile_icon {
	width: 15%;
	color: #999;
}
.find_pass {
  	color: #999;
}
</style>
