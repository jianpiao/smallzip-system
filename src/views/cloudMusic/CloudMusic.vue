// 歌单列表
<template>
  <div class="cloud-music">
    <Userinfo/>
    <MenuList/>
    <div class="singer" id="singer">
      <ul>
        <li v-for="(item,index) in list" :key="index" @click="jumpPlayListDetail()">
          <div class="li-header">
            <img :src="item.coverImgUrl">
          </div>
          <div class="li-content">
            <p class="li-title">歌单名称：</p>
            <p class="li-name">{{item.name}}</p>
          </div>
          <div class="li-tags" v-show="item.tags.length > 0">
            <p class="li-title">歌单标签：</p>
            <el-tag type="success" v-for="(tItem,tIndex) in item.tags" :key="tIndex" class="li-tag">
              {{tItem}}
            </el-tag>
          </div>
          <div class="li-description" v-show="item.description">
            <p class="li-title">歌单描述：</p>
            <pre><p>{{item.description}}</p></pre>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { CMPlaylist } from "../../request/cloudApi";
import Userinfo from './components/userinfo'
import MenuList from './components/menuList'
import axios from "axios";
export default {
  name: "CloudMusic",
  data() {
    return {
      list: []
    };
  },
  created(){
      this.$store.dispatch("fullscreenLoading", true);
  },
  mounted() {
    this.getData();
  },
  components:{
    Userinfo,
    MenuList
  },
  methods: {
    getData() {
      let userid = this.$store.state.cloudMusic.userinfo.userId
      CMPlaylist(userid).then(res => {
        this.list = res.playlist;
        this.$store.dispatch("fullscreenLoading", false);
      });
    },
    jumpPlayListDetail(i) {
      this.$router.push(`msSingerDetail`);
    }
  }
};
</script>

<style scoped>
.cloud-music {
  position: relative;
  padding: 20px;
  background: #222;
}

ul {
  padding: 0;
  margin: 0;
  column-gap: 0;
  column-count: 2;
}
li {
  background-color: #fff;
  list-style-type: none;
  border-radius: 5px;
  break-inside: avoid;
  margin: 20px;
}

.li-content,
.li-tags,
.li-description {
  padding: 10px 20px;
}

.li-tag {
  margin-right: 15px;
}

.li-name {
  font-size: 1.5rem;
}

.li-title {
  color:#9ea59b;
  font-size:.9rem;
}

.li-header > img {
  width: 100%;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

pre {
  white-space: pre-wrap;
  white-space: -moz-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  word-wrap: break-word;
}

@media (min-width: 1300px) {
  ul {
    column-count: 4;
  }
}
@media (min-width: 992px) and (max-width: 1300px) {
  ul {
    column-count: 3;
  }
}
@media (min-width: 768px) and (max-width: 991px) {
  ul {
    column-count: 2;
  }
}
@media (max-width: 767px) {
  ul {
    column-count: 1;
  }
}
</style>
