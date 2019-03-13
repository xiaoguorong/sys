<template>
  <div class="index">
    我是首页
    <button @click="loginout">退出登录</button>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {

    }
  },
  created(){
      this.$axios.post("/sys/index/index",{"a":1}).then((res)=>{
          console.log(res)
      })
  },
  methods:{
      loginout(){
          window.localStorage.removeItem('x-sys-token');
      }
  }
}
</script>

<style scoped>

</style>
