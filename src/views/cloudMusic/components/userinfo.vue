<template>
    <div class="userinfo">
        <div class="user">
            <!-- <img :src="userinfo.avatarUrl"> -->
            <div>{{userinfo}}</div>
            <!-- <div>{{userinfo.nickname}}</div> -->
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'userinfo',
    computed:{
        ...mapState([
            `userinfo`
        ])
    }
}
</script>

<style scoped>
.userinfo {
    background-color: rgba(0, 0, 0, 0);
}

.user {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: rgba(185, 185, 185, .3);
    border-radius: 30px;
}

.user img {
    width: 60px;
    height: 60px;
    border-radius: 50%;
}

.user div {
    margin-left: 20px;
    color: #fff;
}
</style>


