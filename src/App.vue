<template>
  <div id="app">
      <keep-alive include="home">
          <router-view/>
      </keep-alive>
 
  </div>
</template>

<style>
*{
    margin: 0;
    padding: 0;
    list-style: none;
}
body{
   width:100%;
  height: 100%;
   background-color: #F4F4F4;

}
#app{
 
}


</style>

<script>
  export default {
    created(){
      
    }
  }

</script>
