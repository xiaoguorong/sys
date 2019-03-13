<template>
  <div class="hello">
    <input type="tel" v-model="mobile"><br>
    <input type="text" v-model="password"><br>
    <button @click="login">登录</button>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      mobile:'',
      password:''
    }
  },
  methods:{
    login(){
      if(!this.mobile) alert("请输入手机号");
      if(!this.password) alert("请输入密码");
      let postData={
        mobile:this.mobile,
        password:this.password
      }
      this.$axios.post("/sys/user/login",postData).then((res)=>{
        if(res.data.code == 200){
          let token = res.data.token_info.sys_x_token;
          window.localStorage.setItem('x-sys-token',token);
          this.$router.push({name:'Index'});
        }
      })
        
    }
  }
}
</script>

<style scoped>

</style>
