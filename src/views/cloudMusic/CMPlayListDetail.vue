// 歌单列表
<template>
  <div class="play-list">
    <div class="singer">
      <ul>
        <li v-for="(item, index) in list" :key="index">
          <img :src="item.picUrl">
          <div>{{item.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { CMPlaylistDetail } from "../../request/cloudApi";
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
      CMPlaylistDetail().then(res => {
        console.log(res);

        this.$store.dispatch("fullscreenLoading", false);
      });
    }
  }
};
</script>

<style  scoped>
.play-list {
  position: relative;
  padding: 20px;
  background: #222;
}

.singer ul li {
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
