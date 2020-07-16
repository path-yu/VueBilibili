<template>
    <div class="logintop">
        <ul>
            <li></li>
            <li> {{middleTop }}</li>
            <li>
                <slot name="right">  </slot>
            </li>
        </ul>
      
    </div>
</template>

<script>
export default {
    props:["middleTop"],
    name:"logintop",

}
</script>

<style>

</style>

<style lang="less">

.logintop{
    height:12.5vw;
    background-color: white;
    ul{
        display: flex;

       li{
           flex: 1;
           line-height: 12.5vw;
           text-align: center;
           font-size: 4.444vw;
       }
    }
}
</style>