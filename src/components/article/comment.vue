<template>
  <div class="commentParent" v-if="commnetList">
    <div v-for="(item,index) in commnetList" :key="index">
      <div class="commnetItem">
        <div class="user_img">
             <img v-if="item.userinfo &&item.userinfo.user_img"  :src="item.userinfo.user_img" />
          <img v-else src="../../assets/head.jpg" />
        </div>
        <div class="Commentcontent">
          <p>
            <span v-if="item.userinfo"> {{item.userinfo.name}}</span>
           <span v-else> 此用户无评论</span>
            <span> {{item.comment_date}} </span>
          </p>
          <div>
           {{item.comment_content}}
           <span class="pusliss" @click="publishClick(item.comment_id)">回复</span>
          </div>
        </div>
      </div>
        <div style="padding-left:8.333vw;">
       <comment-item :commentChild="item.child" @postPublish="publishClick" ></comment-item>
     </div>
    </div>
   
  </div>
</template>
<script>
  import commentItem from "../article/commentItem";

  export default {
    data () {
      return {
        commnetList:null,
      }
    },
    methods: {
      async commentData() {
        const res = await this.$http.get("/comment/" + this.$route.params.id);
        this.commnetList = this.changeCommentData(res.data)
        if(res.data){
          this.$emit("lengthSelect", res.data.length)
        }
      },
      changeCommentData(data){
       function fn(temp){
          let arr1 =[]
          for(let i = 0, len = data.length; i < len;i++){
            if(data[i].parent_id == temp){
              arr1.push(data[i])
              data[i].child = fn(data[i].comment_id)
            }
          }
          return arr1
         }
         return fn(null)
    },
    publishClick(id){
       
        this.$emit('publishClick',id)
    }
    },
    created() {
      this.commentData();
    },
    components: {
      commentItem,
    }
  }
</script>

<style lang="less">
  .commentParent {
    padding: 0 2.778vw 8.333vw;
  

    >div {
    border-bottom: 1px solid #e7e7e7;
    }

    .commnetItem {
      display: flex;
      margin-top: 1.389vw;
      // align-items: center;
      padding:1.389vw 0  ;
     
      .user_img {
        img {
          width: 9.722vw;
          height: 9.722vw;
          margin-right: 2.778vw;
          border-radius: 50%;
        }
      }

      .Commentcontent {
        flex: 1;


        p {
          display: flex;
          font-size: 3.333vw;
          color: #555;
          justify-content: space-between;

        }

        div {
          position: relative;
          font-size: 3.611vw;
          padding: 2.778vw 0;
            .pusliss{
            color:red;
              position: absolute;
              right:1.389vw;
            }
        }
      }
    }
  }

</style>