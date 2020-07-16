<template>
  <div>
    <div class="editBanner" @click="bannerClick">
        <p> {{left}} </p>
         <p>
            <slot name="right"></slot>
          </p>
    </div>
  </div>
</template>

<script>
export default {
  props:["left"],
  methods:{
    bannerClick(){
      this.$emit("bannerClick")
    }
  }
}
</script>

<style lang="less">
.editBanner{
  background:white;
  padding: 2.778vw;
  border-bottom: 0.278vw solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p{
    font-size: 3.611vw;
    color: #505050;
    padding: 2.5vw 0 2.5vw 2.778vw;
  }
}
</style>