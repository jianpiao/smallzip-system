// 歌手详情
<template>
  <div class="singer-detial">
    <h1 @click="back">返回</h1>
    <h1>歌手详情</h1>
  </div>
</template>

<script>
import { CMSingerArtist } from '../../request/cloudApi'
import axios from 'axios'
export default {
  name: "CMSingerDetail",
  data() {
    return {
      list:[]
    };
  },
  mounted() {
      this.$store.dispatch('fullscreenLoading',false)
  },
  methods: {
    getData() {
      CMSingerArtist().then(res => {
        this.list = res.list.artists
        this.$store.dispatch('fullscreenLoading',false)
      })
    },
    back(i) {
        this.$router.back(-1)
    }
  }
};
</script>

<style scoped>
.singer-detial {
  position: relative;padding:20px;
  background: #222;color:#fff;
}
</style>
