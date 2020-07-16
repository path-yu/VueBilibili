<template>

    <div class="commnetItems">
        <div class="commnetItem" v-for="(item,index) in commentChild" :key=index>
            <div class="user_img">
                <img v-if="item.userinfo &&item.userinfo.user_img" :src="item.userinfo.user_img" />
                <img v-else src="../../assets/head.jpg" />
                <p>
                    <span v-if="item.userinfo"> {{item.userinfo.name}}</span>
                    <span v-else> 此用户无姓名</span>
                    <span> {{item.comment_date}} </span>
                </p>
            </div>
            <div class="Commentcontent">
                <div>
                    <div v-if="!temp">{{item.comment_content}} <span class="pusliss"
                            @click="PostItemComment(item.comment_id)">回复</span> </div>
                    <div v-else>回复:<span style="color:#58a">{{item.parent_user_info.name}}</span>
                        {{item.comment_content}} <span class="pusliss" @click="PostItemComment(item.comment_id)">
                            回复</span> </div>
                </div>
            </div>
                <commneChild-item :commentChild="item.child" :temp="true" @postChild="postChild"></commneChild-item>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'commneChildItem',
        props: ['commentChild', 'temp'],
        methods: {
            PostItemComment(id) {
             this.$emit('postPublish',id)
              this.$emit('postChild',id)
            },
            postChild(id){
                this.PostItemComment(id)
                this.$emit('postPublish',id)
            } 
        }
    }
</script>

<style lang="less">
    .commnetItems {


        .commnetItem {
            display: flex;
            flex-direction: column;

            .user_img {
                display: flex;

                p {
                    flex: 1;
                    display: flex;
                    font-size: 3.333vw;
                    color: #555;
                    justify-content: space-between;
                }

                img {
                    border-radius: 50%;
                }
            }
        }

        .Commentcontent {
            position: relative;

            .pusliss {
                position: absolute;
                right: 1.389vw;
                color: red;
            }
        }
    }
</style>