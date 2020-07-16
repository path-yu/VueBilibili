<template>
  <div>
    <nav-bar :topHeadImg="model.user_img"></nav-bar>
    <div style="margin-top:2.778vw">
      <div class="uploadFile">
        <van-uploader :after-read="afterRead" class="uploadImg" preview-size="100vw" />
        <edit-banner left="头像">
          <template #right>
            <div class="editUserImg">
              <img v-if="model.user_img" :src="model.user_img" class="userEditImg" />
              <img v-else src="@/assets/head.jpg" alt class="userEditImg" />
            </div>
          </template>
        </edit-banner>
      </div>
      <edit-banner left="昵称" @bannerClick="showDialog('昵称','请输入昵称')">
        <template #right>
          <a href="javascript:void(0)">{{model.name}}</a>
        </template>
      </edit-banner>
      <edit-banner left="账号">
        <template #right>
          <a href="javascript:void(0)">{{model.username}}</a>
        </template>
      </edit-banner>
      <edit-banner left="性别" @bannerClick="gendershow = true">
        <template #right>
            <a href="javascript:void(0)" v-if="model.gender"> {{model.gender  ? '男' : '女'}} </a>
            <a href="javascript:void(0)" v-else>保密</a>
        </template>
      </edit-banner>
      <edit-banner left="个性签名" @bannerClick="showDialog('个性签名','请输入个签')">
        <template #right>
          <a href="javascript:void(0)" v-if="model.user_desc">{{model.user_desc}}</a>
          <a href="javascript:void(0)" v-else>这个人很懒,什么都没有留下</a>
        </template>
      </edit-banner>
      <div @click="$router.back()" class="editBack">返回个人中心</div>
    </div>
    <van-dialog
      v-model="show"
      :title="title"
      show-cancel-button
      @confirm="confirmClick"
      @cancel="cancalClick"
    >
      <van-field autofocus v-model="content" :placeholder="placeHolder" />
    </van-dialog>
    <van-action-sheet v-model="gendershow" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar";
import editBanner from "../components/common/editBanner";

export default {
  data() {
    return {
      model: {},
      show: false,
      gendershow: false,
      content: "",
      title: "",
      placeHolder: "",
      actions: [
        { name: "男",val:1 },
        { name: "女",val:0 },
        ]
    };
  },
  components: {
    NavBar,
    editBanner
  },
  methods: {
    async getData() {
      const res = await this.$http.get("/user/" + localStorage.getItem("id"));
      this.model = res.data[0];
    },
    async afterRead(file) {
      const formData = new FormData();
      formData.append("file", file.file);
      const res = await this.$http.post("/upload", formData);
      this.model.user_img = res.data.url;
      this.userUpdate();
    },
    async userUpdate() {
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      if(res.data.code == 200){
          this.$msg.fail("修改成功")
      }
    },
    async confirmClick() {
      if (this.title == "个性签名") {
        this.model.user_desc = this.content;
      } else {
        this.model.name = this.content;
      }
      const res = await this.$http.post(
        "/update/" + localStorage.getItem("id"),
        this.model
      );
      this.userUpdate();
      this.content = "";
    },
    cancalClick() {
      this.content = "";
    },
    showDialog(title, msg) {
      this.show = true;
      this.title = title;
      this.placeHolder = msg;
    },
    onSelect(data){
        this.model.gender = data.val;
         this.userUpdate();
         this.gendershow = false
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style lang="less">
a {
  color: #999;
}

.userEditImg {
  width: 11.111vw;
  height: 11.111vw;
}

.editUserImg {
  border-radius: 50%;
  overflow: hidden;
}
.uploadFile {
  position: relative;
  overflow: hidden;
  .uploadImg {
    position: absolute;
    opacity: 0;
  }
}
.editBack{
    background-color: white;
    margin-top: 5.556vw;
    text-align: center;
    padding:2.778vw;
    color: #999;
    font-size: 4.444vw;
}
</style>