<template>
  <div>
    <nav-bar></nav-bar>
    <div class="categoryTab">
   
      <van-tabs v-model="active" lazy-render sticky>
        <van-tab v-for="(item,index) in category" :key="index" :title="item.title">
          <van-list v-model="item.loading" :finished="item.finished" finished-text="我也是有底线的" @load="onLoad"
            :immediate-check="false">
            <div class="detailParent">
              <detail class="detailItem" v-for="(categoryItem,categoryIndex) in item.list" :detailItem="categoryItem"
                :key="categoryIndex" />
            </div>
          </van-list>
        </van-tab>
      </van-tabs>
      
    </div>

  </div>
</template>

<script>
  import navBar from "../components/common/NavBar";
  import Detail from "./Detail";
  export default {
    name: "home",
    data() {
      return {
        category: [],
        active: ""
      };
    },
    components: {
      navBar,
      Detail
    },
    created() {
      this.selectCategory();
    },
    methods: {
      async selectCategory() {
        const res = await this.$http.get("/category");
        this.changeCategory(res.data);
      },
      changeCategory(data) {
        this.category = data.map((v, k) => {
          v.list = [];
          v.page = 0;
          v.finished = false;
          v.loading = false;
          v.pagesize = 10;
          return v;
        });
      },
      async getArticle() {
        const CategoryItem = this.CategoryItem();

        const res = await this.$http.get("/detail/" + CategoryItem._id, {
          params: {
            page: CategoryItem.page,
            pagesize: CategoryItem.pagesize
          }
        });

        CategoryItem.list.push(...res.data);
        CategoryItem.loading = false;
        if (res.data.length < CategoryItem.pagesize) {
          CategoryItem.finished = true;
        }
      },

      CategoryItem() {
        const categoryItem = this.category[this.active];
        return categoryItem;
      },
      onLoad() {
        const CategoryItem = this.CategoryItem();
        setTimeout(() => {
          CategoryItem.page += 1;
          this.getArticle();
        }, 1000);
      }
    },
    watch: {
      active(val) {
        this.getArticle();
      }
    }
  };
</script>

<style lang="less">
.categoryTab{
  position:  relative;
  .icon_setting{
   
    position: absolute;
     top: 8.556vw;
    right: 2.556vw;
    z-index: 9999;
    padding: 1.389vw;
  }
}
  .detailParent {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .detailItem {
      width: 45%;

    }
  }

  .van-tabs__wrap {

    z-index: 999;
    overflow: hidden;
  }

  .van-tab__text {
    font-size: 3.889vw;
  }

  .van-tabst::-webkit-scrollbar {
    display: none
  }
</style>