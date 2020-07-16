<template>
    <div>
        <div class="detail" @click="pathPush">
            <img :src="detailItem.img" alt="" srcset="" style="width:100% ">
            <div class="videoInfo">
                <div class="comountContent">
                    <van-icon name="play-circle-o" />
                    <span class="comount"> 22.12万</span>
                </div>

                <div class="commentContent">
                    <van-icon name="comment-o" class="icon-commnet"/>
                    <span class="commnet"> 1.3万</span>
                </div>
            </div>
            <p>{{  detailItem.name}}</p>
        </div>


    </div>
</template>

<script>
    export default {
        props: ["detailItem"],
        methods:{
            pathPush(){
                if(this.$route.path != `/article/${this.detailItem.id}`){
                    this.$router.push(`/article/${this.detailItem.id}`)
                }
            }
        },
       
    }
</script>

<style lang="less">
    .detail {
        margin-top: 2.778vw;
        .videoInfo {
            width: 100%;
            height: 8.333vw;
            position: relative;
            margin-top: -2.778vw;
            background: linear-gradient(0deg, rgba(0, 0, 0, .6), transparent);
            div{
                display: flex;
                align-items: center;
                justify-content: space-around;
                .comount{
                    padding-left: 5px;
                }
                .commnet{
                    padding-left: 5px;
                }
            }
        }
        img {
            height: 25vw;
        }
        div {
            position: absolute;
            font-size: 2.778vw;
            color: white;
            bottom: 2.778vw;
            font-weight: bold;
          
        }

        .comountContent {
            left: 2.778vw;
        }

        .commentContent {
            right: 2.778vw;
        }
        p {
            font-size: 3.2vw;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }
    }
</style>