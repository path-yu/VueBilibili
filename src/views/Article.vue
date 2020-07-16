<template>
  <div v-if="flag">
    <nav-bar></nav-bar>
    <div class="detailInfo">
      <div class="videoContent">
        <video :src="model.content" controls></video>
      </div>
      <div class="vieoMsg">
        <p>
          <span>{{model.category.title}}</span>
          {{model.name}}
        </p>
        <div class="videoinfo">
          <span>{{model.userinfo.name}}</span>
          <span>165.万播放量</span>
          <span>526弹幕</span>
          <span>{{model.date}}</span>
        </div>

        <div class="AboutVideo">
          <div :class="{activeColor:colleacActive}">
            <van-icon name="star" @click="collectClick"  />收藏
          </div>
          <div @click="ConcernClick" :class="{activeColor:Concern}">
            <i class="iconguanzhu iconfont">  </i> 关注
          </div>
          <div>
            <van-icon name="share" />分享
          </div>
        </div>
      </div>
    </div>
    <div class="detailParent">
      <detail
        class="detailItem"
        v-for="(item,index) in commentList"
        :key="index"
        :detailItem="item"
      />
    </div>
    <comment-title :datalength="lens" @postComment="postSuccessComment" ref="commetCom"></comment-title>
    <comment @lengthSelect="len => lens = len" @publishClick="postChildClick" ref="commentPulish" />
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar";
import detail from "./Detail";
import commentTitle from "../components/article/commentTitle";
import comment from "../components/article/comment";
export default {
  data() {
    return {
      model: {},
      flag: false,
      commentList: null,
      lens: null,
      Postcom: {
        comment_content: "",
        comment_date: "",
        parent_id: null,
        article_id: null
      },
      colleacActive:null,
      Concern:null,
    };
  },
  components: {
    NavBar,
    detail,
    commentTitle,
    comment
  },
  methods: {
    // 获取文章信息
    async getArticleData() {
      const res = await this.$http.get("/article/" + this.$route.params.id);
      this.model = res.data[0];
      this.flag = true;
        if(this.model){
          this.Concernint()
      }
    },
    // 获取评论信息
    async commentData() {
      const res = await this.$http.get("/commend");
      this.commentList = res.data;
    },
    // 获取用户信息
    async myuserinfo() {
      if(localStorage.getItem('token')){
         const res = await this.$http.get("/user/" + localStorage.getItem("id"));
         console.log(11121);
         this.myuser = res.data[0];
      }
    },
    // 发表评论
    async postSuccessComment(val) {
      let date = new Date();
      let m = date.getMonth() + 1,
        d = date.getDate();
      if (m < 10) m = "0" + m;
      if (d < 10) d = "0" + d;
      let str = `${m}-${d}`;
      if (val == "") {
        this.$msg.fail("请不要输入空值");
        return;
      }
      this.Postcom.comment_content = val;
      this.Postcom.comment_date = str;
      this.Postcom.article_id = this.$route.params.id;
      const res = await this.$http.post(
        "/comment_post/" + localStorage.getItem("id"),
        this.Postcom
      );
      this.$refs.commentPulish.commentData();

      if (res.status == 200) {
        this.$msg.fail("评论发表成功");
      }
      this.Postcom.parent_id = "";
    },
    postChildClick(id) {
      this.$refs.commetCom.focus();
      this.Postcom.parent_id = id;
    },
    // 收藏文章
    async collectClick() {
      if(localStorage.getItem('token')){
        const res = await this.$http.post('/collection/' +localStorage.getItem('id'),{article_id:this.$route.params.id})
        console.log(res.data);
        if(res.data.msg === '收藏成功'){
          this.colleacActive = true
        }else{
            this.colleacActive = false
        }
         this.$msg.fail(res.data.msg)
      }else {
          this.$msg.fail('请先登录')
      }
    },
    // 初始获取文章是否收藏数据
    async collectinint(){
        if(localStorage.getItem('token')){
          const res = await this.$http.get('/collection/' + localStorage.getItem('id'),{
            params:{
              article_id:this.$route.params.id,
            }
          })

       this.colleacActive = res.data.success
        }
    },
    // 关注用户
    async ConcernClick() {
      if(localStorage.getItem('token')){
        const res = await this.$http.post('/sub_scription/' +localStorage.getItem('id'),{sub_id:this.model.userid})
        console.log(res.data);
        if(res.data.msg === '关注成功'){
          this.Concern = true
        }else{
          this.Concern = false
        }
        this.$msg.fail(res.data.msg)
      }else{
          this.$msg.fail('请先登录')
      }
    },
    // 进入页面获取是否关注
     async Concernint(){
        if(localStorage.getItem('token')){
          const res = await this.$http.get('/sub_scription/' + localStorage.getItem('id'),{
            params:{
              sub_id:this.model.userid,
            }
          })
  
       this.Concern = res.data.success
        }
       
    },
  },
  created() {
    this.getArticleData();
    this.commentData();
    this.collectinint()
   

    if (localStorage.getItem("token")) {
      this.myuserinfo();
    }
  },
  watch: {
    $route(to, from) {
      this.getArticleData();
      this.commentData();
    }
  }
};
</script>

<style lang="less">
.activeColor{
  color: #F275A2;
}
.videoContent {
  width: 100%;

  video {
    width: 100%;
  }
}

.vieoMsg {
  padding: 2.778vw;

  p {
    font-size: 4.26667vw;

    span {
      color: #fb7299;
      padding: 1.389vw;
      font-size: 3.2vw;
      background-color: #f4f4f4;
    }
  }

  .videoinfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2.222vw;

    :first-child {
      font-size: 3.889vw;
      color: #212121;
    }

    span {
      font-size: 3.2vw;
      color: #999;
    }
  }
}

.AboutVideo {
  width: 50%;
  display: flex;
  justify-content: space-between;
  font-size: 3.889vw;
  margin-top: 2.778vw;
  color: #999;

  div {
    display: flex;
    align-items: center;
  }
}
</style>