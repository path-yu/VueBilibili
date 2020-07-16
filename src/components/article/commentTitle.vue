<template>
    <div class="commentList" >
       <p class="comment-title">
           <span>评论</span>
           <span > ({{(datalength)}})</span>
       </p> 
        <div class="mycomment" >
         
            <img   v-if="myuser" :src="myuser.user_img" alt="" />
             <img  v-else  src="../../assets/head.jpg" alt="" />
            <input type="text" placeholder="说点什么吧"  ref="Postinput" @focus="onfoucs" v-model="commentContent">
          <van-button type="primary" info="" size="small" @click="commentPublish">发表</van-button>
        </div>
    </div> 
</template>

<script>
    export default {
        props:["datalength"],
        data() {
            return {
                myuser: null,
                commentContent:"",
            }
        },
        methods: {
            async myuserinfo() {
                const res = await this.$http.get("/user/" + localStorage.getItem('id'));
                console.log(111);
                this.myuser = res.data[0]
              
            },
            onfoucs(){
                if(!this.myuser && !localStorage.getItem('id')&&!localStorage.getItem('token')){
                    console.log(111);
                    this.$msg.fail("请先登录")
                    return
                }
            },
            commentPublish(){
                this.$emit('postComment', this.commentContent)
                this.commentContent =""
            },
            focus(){
              this.$refs.Postinput.focus();
               
            }
        },
        created() {
            if(localStorage.getItem('token')){
                this.myuserinfo()
            }
            
        },
     
    }
</script>

<style lang="less">
.commentList{
    padding:  2.778vw 2.778vw 4.167vw;
    .comment-title{
        :last-child{
            color: #999;
        }
    }
    .mycomment{
        display: flex;
        align-items: center;
        padding: 2.778vw 0;
        img{
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-right: 1.389vw;
        }
        input{
            border-radius: 2.778vw;
            outline: none;
            border: 0;
            background-color: #f4f4f4;
            font-size: 3.611vw;
            padding: 1.389vw;
        }
      
    }
}
</style>