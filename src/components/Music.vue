<template>
  <div class="hello">
    <div class="singer" id="singer">
      <!-- <div class="singer-top-tag">{{singerTopTag | filterSingerTag}}</div> -->
      <ul class="singer-ul">
        <li v-for="(item, index) in list" :key="index" class="singer-ul-li">
          <div class="singer-tag" :id="item.tag">{{item.tag | filterSingerTag}}</div>
          <ul>
            <li v-for="(fitem, findex) in item.data" :key="findex" @click="jumpSingerDetail(fitem.Fsinger_mid)">
              <img :src="`https://y.gtimg.cn/music/photo_new/T001R300x300M000${fitem.Fsinger_mid}.jpg?max_age=2592000`">
              <div>{{fitem.Fsinger_name}}</div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="sort">
      <!-- :class="{current:currentSort == item ? true : false}" -->
      <ul>
        <li 
        v-for="(item, index) in sortList" 
        :key="index" 
        @click="jumpTag(item)"
        >
          {{item == `hot` ? `热` : item}}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { apiAddress } from "@/request/api"; // 导入我们的api接口
import axios from 'axios'
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "我是头部",
      list:[],
      sortList:[],
      currentSort: 'hot',
      singerTopTag: 'hot',
    };
  },
  computed: {
    items() {
      return this.$store.getters.data;
    }
  },
  mounted() {
    this.getData();
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      let offsetTop = 0
      this.list.forEach((item,index) => {
        //  获取每个排序标签的位置
        offsetTop = document.querySelectorAll('.singer-ul-li')[index].offsetTop
        if (scrollTop > offsetTop && scrollTop < (offsetTop+ 70*item.data.length)) {
          this.singerTopTag = item.tag
          this.currentSort = item.tag
        }
      })
    },
    testData(){
      // axios.get(`https://c.y.qq.com/v8/fcg-bin/v8.fcg?g_tk=1928093487&inCharset=utf-8&outCharset=utf-8&notice=0&format=jsonp&channel=singer&page=list&key=all_all_all&pagesize=100&pagenum=1&hostUin=0&needNewCode=0&platform=yqq&jsonpCallback=jp1`).then(res => {
      //   console.log(res);
        
      // })
    },
    getData() {
      apiAddress().then(res => {
        res = res.substring(5,res.length-1)
        res = JSON.parse(res).data.list
        res = res.sort((a,b) => a.Findex.localeCompare(b.Findex))
        res.forEach((item,index) => {
          //　添加侧栏排序
          item.Findex = item.Findex == 9 ? 'hot' : item.Findex
          this.sortList.push(item.Findex)
        })
        //  去除重复
        this.sortList = new Set(this.sortList)
        this.sortList = [...this.sortList]
        //  添加排序标签和歌手列表
        this.sortList.forEach(e => {
          this.list.push({
            tag:e,
            data:res.filter(i => i.Findex ==e)
          })
        })
        this.$store.dispatch('fullscreenLoading',false)
      }).catch(err => {
        this.$store.dispatch('fullscreenLoading',false)
      })
    },
    jumpPage() {
      this.$store.dispatch("setData", this.$store.getters.data);
    },
    jumpTag(i){
      this.currentSort = i
      document.querySelector(`#${i}`).scrollIntoView()
    },
    //  查看歌手详情
    jumpSingerDetail(i) {
      this.$router.replace({
        name:'singerDetail',
        params:{id:i}
      })
    }
  },
  filters :{
    filterSingerTag(i) {
      return i == `hot` ? `热门` : i
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: relative;
  background-color: #222;
}

.singer {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #222;
}

.singer-top-tag {
  position: fixed;
  top: 100px;
  left: 251px;
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: hsla(0,0%,100%,.5);
  background: #333;
}

.singer-tag {
  width: 100%;
  height: 30px;
  margin-bottom: 20px;
  line-height: 30px;
  padding-left: 20px;
  font-size: 12px;
  color: hsla(0,0%,100%,.5);
  background: #333;
}

.singer-ul-li ul li {
  list-style-type: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0 20px 20px;
  color: rgba(255, 255, 255, .5);
  cursor: pointer;
}

.singer-ul-li ul li img {
  border-radius: 50%;
  width: 50px;
  height: 50px;
}

.singer-ul-li ul li div {
  padding-left: 20px;
}

.sort {
  position: fixed;
  z-index: 30;
  right: 0;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  background: rgba(0,0,0,.3);
  font-family: Helvetica;
}

ul {
  margin: 0;
  padding: 0;
}

.sort ul{
  color: rgba(255,255,255,.6);
}

.sort ul li {
  list-style-type: none;
  padding: 3px;
  line-height: 1;
  font-size: 12px;
}

.current {
  color: #ffcd32;
}
</style>
