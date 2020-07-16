<template>
  <div class="register">
    <login-top middleTop="注册bilibili">
       <template v-slot:right>
            <router-link to="/login">登录</router-link>
        </template>
    </login-top>
    <login-text 
      label="姓名" 
      type="text"
      class="name"
      name="name"
      placeholder="请输入姓名"
      rule="^.{6,16}$"
      @inputChange="successInput"
     ></login-text>

    <div class="content">
      <login-text 
        label="账号"
        type="text"
        name="username"
        placeholder="请输入账号"
        rule="^.{6,16}$"
         @inputChange="successInput"
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
      <loginbtn btnText="注册" @registerSubmit="registerSubmit"></loginbtn>
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
          name:"",
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
      if(rule.test(this.model.name) && rule.test(this.model.username) && rule.test(this.model.password)){ // 验证输入框
      const res =  await this.$http.post('/register',this.model) 
      this.$msg.fail(res.data.msg)
      localStorage.setItem('id',res.data.id);
      localStorage.setItem('token',res.data.objtoken);
      setTimeout(() =>{
        if(res.data.code == 200){
           this.$router.push("/userinfo")
        }
      },1000)
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