<template>
    <div class="menu-list">
        <div class="list">
            <div class="menuFirst">菜单：</div>
            <div v-for="(item,index) in items" :key="index" class="menuTag">{{item}}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name:'userinfo',
    data() {
        return {
            items:[`个人中心`,`歌曲列表`]
        }
    }
}
</script>

<style scoped>
.menu-list {
    background-color: rgba(0, 0, 0, 0);
    margin: 20px 0;
}

.list {
    height: 60px;
    display: flex;
    align-items: center;
    background-color: rgba(185, 185, 185, .3);
    border-radius: 30px;
}

.list div {
    margin-left: 20px;
    color: #fff;
}

.menuFirst {
    font-size: 1.4rem;
}

.menuTag {
    font-size: .9rem;
}
</style>


