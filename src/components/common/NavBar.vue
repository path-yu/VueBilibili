<template>
  <div>
    <ul class="navBar">
      <li class="logo">
        <img src="@/assets/bilibiliLog.png" alt @click="tohome" />
      </li>
      <li>
        <p>
          <van-icon name="search" class="serch" />
          <span>请输入内容</span>
          
        </p>
      </li>
      <li>
        <div class="head">
          <img :src="topHeadImg" alt @click="$router.push('/userinfo')" />
        </div>
       
        <p>下载app</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    topHeadImg: {
      default: "/img/head.e0561643.jpg",
      type: String
    }
  },
  methods: {
    tohome(){
      if(this.$route.path !== "/"){
         this.$router.push('/')
      }
   
    }
  }
};
</script>

<style lang="less">
.navBar {
  background-color: white;
  display: flex;
  padding-bottom: 0.556vw;
  justify-content: center;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 33.333vw;
    height: 16.667vw;
    img {
      width: 16.667vw;
      height: 7.5vw;
    }
  }
  li:nth-child(2) {
    flex: 1;
    display: flex;
    align-items: center;
    p {
      background-color: #f4f4f4;
      width: 90%;
      padding: 1.389vw;
      font-size: 3.333vw;
      color: #505050;
      border-radius: 2.778vw;
      span {
        display: inline-block;
        margin-left: 2.778vw;
      }
    }
    .serch {
      position: relative;
      top: 0.556vw;
      left: 1.389vw;
    }
  }
  li:last-child {
    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;
    img {
      width: 6.667vw;
      height: 6.667vw;
    }
    .head {
      border-radius: 50%;
      overflow: hidden;
    }
    p {
      color: white;
      font-size: 3.46667vw;
      width: 19.444vw;
      padding: 1.389vw;
      text-align: center;
      border-radius: 1.389vw;
      background-color: #fb7299;
      margin: 0 2.778vw;
    }
  }
}
</style>