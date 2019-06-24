// 歌手列表
<template>
  <div class="singer-hot-list">
    <div class="singer" id="singer">
      <ul>
        <li v-for="(item, index) in list" :key="index" @click="jumpSingerDetail(item.name)">
          <img :src="item.picUrl">
          <div>{{item.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { CMSingerArtist, CMLogin, CMLoginState } from "../../request/cloudApi";
import axios from "axios";
export default {
  name: "CloudMusic",
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      CMSingerArtist().then(res => {
        this.list = res.list.artists;
        this.$store.dispatch("fullscreenLoading", false);
      });
    },
    jumpSingerDetail(i) {
      this.$router.push(`msSingerDetail`);
    }
  }
};
</script>

<style  scoped>
.singer-hot-list {
  osition: relative;
  padding: 20px;
  background: #222;
}
p .singer ul li {
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 20px 20px;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
}

.singer ul li img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.singer ul li div {
  padding-left: 20px;
}
</style>
