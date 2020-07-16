<template>
  <div>
    <div class="userDetail">
      <div>
        <div class="user-head">
          <img v-if="userData.user_img" :src="userData.user_img" alt />
          <img v-else src="../../assets/head.jpg" alt />
        </div>
      </div>
      <div>
        <div class="user-count">
          <p>
            <span>2</span>
            <span>粉丝</span>
          </p>
          <p>
            <span>73</span>
            <span>关注</span>
          </p>
          <p>
            <span>7</span>
            <span>获赞</span>
          </p>
        </div>
        <div class="editBox">
          <van-button type="default" class="edit" @click="$router.push('/edit')">编辑资料</van-button>
        </div>
        
      </div>
    </div>

    <div class="introduce">
        <p>{{userData.name}}</p>
        <p v-if="userData.user_desc" > {{userData.user_desc}} </p>
        <p v-else>这个人很懒,什么都没有写</p>
    </div>
    <div class="tabs">
       <span>动态</span>
        <span>视频</span>
    </div>
  </div>
</template>

<script>
export default {
  props:["userData"],
  created(){
  
  }
};
</script>

<style lang="less">
.userDetail {
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 0 2.778vw;
  .user-head {
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 22.222vw;
      height: 22.222vw;
    }
  }
  :nth-child(2) {
    flex: 0.9;
  }
  .user-count {
    display: flex;

    padding: 4.167vw;
    justify-content: space-between;
    p {
      flex: 1;
      text-align: center;
      border-right: 0.278vw solid #ccc;
      span {
        display: block;
        font-size: 2.5vw;
      }
      :last-child {
        color: #999;
      }
    }
    :last-child {
      border: none;
    }
  }
}
.editBox {
  .edit {
    width: 100%;
    height: 7.5vw;
    font-size: 3.333vw;
    border: 1px solid #fb7299;
    color: #fb7299;
    border-radius: 1.389vw;
  }
}
.introduce{
    padding-bottom: 1.389vw;
    border-bottom: 0.278vw solid #999;
    :first-child{
        padding: 4.778vw 4.778vw 0;
        color: #212121;
        font-size: 4.8vw;
    }
    p{
         padding:  2.222vw  4.778vw  0;
         font-size: 3.333vw;
         color: #999;
    }
}
.tabs{
    display: flex;
    font-size:3.889vw;
    color: #757575;
    padding: 2.778vw;
    span{
        display: inline-block;
        margin-left: 2.778vw;
    }
}
</style>