<template>
    <div  id="userinfo">
        <nav-bar></nav-bar>
        <div class="userbg">
           <img src="@/assets/userBg.png" alt="">
        </div>
        <user-detail :userData="model"></user-detail>
    </div>
</template>

<script>
import NavBar from "../components/common/NavBar"
import userDetail from "../components/userComponents/userDetail"
export default {
    name:"userinfo",
    data () {
        return {
            model:{}
        }
    },
    components:{
        NavBar,
        userDetail,
    },
   methods:{
    async UserInfoData(){
      const res = await this.$http.get('/user/' + localStorage.getItem('id'))
    
        this.model = res.data[0]
    }
  },
  created(){
    this.UserInfoData()
  },
   
}
</script>

<style lang="less">
.userbg{
    padding-top:2.778vw;
    img{
        width: 100%;
        height:21.111vw;
    }
}
</style>