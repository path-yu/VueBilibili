<template>
  <div>
      <div class="loginBtn">
          <van-button plain type="default" class="register" @click="registerClick">{{btnText}} </van-button>
      </div>
  </div>
</template>

<script>
export default {
    name:"loginBtn",
    props:["btnText"],
    methods:{
        registerClick(){
            this.$emit("registerSubmit")
        }
    }
}
</script>

<style lang="less">
.loginBtn{
    text-align: center;
    height: 11.111vw;
    .register{
        width: 80vw;
        margin:4.167vw auto;
        background-color: #FF9DB5;
        border-radius: 5.556vw;
        color: white;
        border: none;
    }
}
</style>