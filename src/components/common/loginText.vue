<template>
    <div class="logintop">
        <van-form >
        <van-field
        :label="label"
        :placeholder="placeholder"
        :type="type"
        :rule="rule"
        :name="name"
        :rules="[{ required: true, }]"
         v-model.trim="content"
        @input="vaindate"
    />
    </van-form>
    </div>
</template>

<script>
export default {
    name:"logintop",
    data () {
        return {
            content:""
        }
    },
    props:["label","type","placeholder","rule","name"],
     methods:{
      vaindate(){
         const reg  = new RegExp(this.rule);
        if(reg.test(this.content)){
            // console.log("正则矫验成功了",this.name);
            this.$emit("inputChange",this.name,this.content)
        }
      }
  }
}
</script>

<style class>
.logintop{

}
</style>