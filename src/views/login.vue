<template>
  <div class="register">
    <login-top middleTop="登录bilibili">
       <template v-slot:right>
            <router-link to="/register">注册</router-link>
        </template>
    </login-top>
   

    <div class="content">
      <login-text 
        label="账号"
        type="text"
        name="username"
        placeholder="请输入账号"
        rule="^.{6,16}$"
         @inputChange="successInput"
         style="margin:4.444vw  0"
       ></login-text>
      <login-text 
        label="密码"
        type="password"
        name="password"
        placeholder="请输入密码"
        rule="^.{6,16}$"
         @inputChange="successInput"
       ></login-text>
    </div>
      <loginbtn btnText="登录" @registerSubmit="registerSubmit"></loginbtn>
  </div>
</template>

<script>
import LoginTop from "../components/common/loginTop";
import LoginText from "../components/common/loginText";
import Loginbtn from "../components/common/loginBtn"

export default {
  name: "register",
  data () {
    return {
      model:{
          username:"",
          password:"",
      }
       
    }
  },
  components: {
    LoginTop,
    LoginText,
    Loginbtn,
  },
  methods:{
    successInput(key,value){
      this.model[key] = value
    },
   async registerSubmit(){
     let rule = /^.{6,16}$/;
      if(rule.test(this.model.username) && rule.test(this.model.password)){ // 验证输入框
        const res =  await this.$http.post('/login',this.model);
        this.$msg.fail(res.data.msg)
        if(res.data.code == 301 || res.data.code == 302){
            return 
        }
        console.log(res);
        localStorage.setItem('id',res.data.id)
        localStorage.setItem('token',res.data.token)
        setTimeout(() => {
            this.$router.push('/userinfo')
        }, 1000);
        
      }else{
          this.$msg.fail("格式不正确,重新输入")
      }
        
  }
  },

};
</script>

<style  lang="less" >
.register > .name {
  margin-top: 5.556vw;
}
.content {
  margin-top: 5.556vw;
}
</style>