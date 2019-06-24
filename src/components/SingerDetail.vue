<template>
  <div class="singer-detail">
    <div class="header" :style="{backgroundImage:'url('+singerImg || ''+')'}">
      <p>{{singerName}}</p>
    </div>
    <div class="songs">
      <ul>
        <li v-for="(item, index) in data.list" :key="index" @click="playMusic(item.playurl)">
          <p>{{item.musicData.songname}}</p>
          <p>{{item.musicData.albumname}}-{{item.musicData.singer[0].name}}</p>
          <p>{{item.playurl}}</p>
        </li>
      </ul>
    </div>
    <MusicPlay :playurl="playurl"/>
  </div>
</template>

<script>
import { singerDetail } from "@/request/api"; // 导入我们的api接口
import MusicPlay from './MusicPlay'
import axios from 'axios'
let getPlay = {
  comm: {
    format: "json",
    g_tk: 5381,
    inCharset: "utf-8",
    needNewCode: 1,
    notice: 0,
    outCharset: "utf-8",
    platform: "h5",
    uin: 0
  },
  req_0: {
    module: "vkey.GetVkeyServer",
    method: "CgiGetVkey",
    param: {
      guid: "5741524946",
      loginflag: 0,
      platform: "23",
      songmid:[],
      songtype:[],
      uin: "0"
    }
  }
};
export default {
  name: "singerDetail",
  data() {
    return {
      data: {
        singer_mid: "0025NhlN2yWrP4",
      },
      singerImg:'',
      singerName:'',
      playList:[],
      playurl:''
    }
  },
  components:{
    MusicPlay
  },
  mounted() {
    this.getSingerDetail();
  },
  methods: {
    getSingerDetail() {
      singerDetail(this.$route.params.id).then(res => {
        res = res.substring(5, res.length - 1);
        this.data = JSON.parse(res).data;
        this.singerImg = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${this.data.singer_mid}.jpg?max_age=2592000`
        this.singerName = this.data.singer_name
        this.data.list.forEach(e => {
            getPlay.req_0.param.songmid.push(e.musicData.songmid)
            getPlay.req_0.param.songtype.push(0)
        })
        //   获取音乐播放地址
        axios({
            method:'post',
            url:'http://ustbhuangyi.com/music/api/getPurlUrl',
            data:getPlay
        }).then(msg => {
            msg.data.req_0.data.midurlinfo.forEach((mItem,mIndex) => {
              this.data.list[mIndex].playurl = mItem.purl
            })
        })
      }).catch(err => {
        console.log(err);
      })
      this.$store.dispatch('fullscreenLoading',false)
    },
    playMusic(i) {
      if (i != '') {
        this.playurl = i
        this.$store.dispatch('showMusicPlay','block')
        this.$store.dispatch('playurl',i)
      } else {
        this.$notify.info({
          title: '提示',
          message: '非会员无法播放'
        });
      }
    }
  }
};
</script>

<style scoped>
.singer-detail{
  position: relative;
  width: 100%;
  height: 100%;
}

.header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.back {
  color: #222;
}

.songs {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  background-color: #222;
}

.songs ul {
  margin-top: 20px;
}

.songs ul li {
  cursor: pointer;
  padding: 20px 20px;
}

.songs ul li p {
  margin: 0;
  padding: 0;
  word-break: break-all;
}

.songs ul li p:nth-child(1) {
  color: #fff;
  font-size: 1rem;
}

.songs ul li p:nth-child(2) {
  margin-top: 5px;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.9rem;
}

.music-play {
    position:fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1000000;
}

.play {
    width: 100%;
    display: flex;
}

.close {
    padding: 0 20px;
    line-height: 32px;
    text-align: center;
    background-color: #fff;
}

.music-play audio {
    flex: 1;
    width: 100%;
}
</style>
