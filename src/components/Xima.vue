<template>
  <div id="wrapper">
    <div class="header">
      <h1 class="title">喜马拉雅-段子来啦</h1>
    </div>
    <main>
      <ul>
        <li v-for="(item,index) in data" :key="index">
          <div class="li-header">
              <img :src="item.coverLarge">
          </div>
          <div class="li-content">
              <p>{{item.title}}</p>
          </div>
          <div class="li-audio">
              <audio controls="controls">
                  <source :src="item.playUrl64" type="audio/mpeg">
              </audio>
          </div>
      </li>
      </ul>
    </main>
  </div>
</template>

<script>
import {xima} from '../api/index'
  export default {
    name: 'xima',
    data() {
      return {
        data:[]
      }
    },
    mounted() {
      this.getData()
    },
    methods: {
      async get() {
        return new Promise((resolve,reject) => {
            this.$http(xima).then(res => {
                resolve(res.data.data.list)
                this.data = res.data.data.list
            }).catch(err => {
                reject(err)
            })
        })
      },
      async getData() {
          await this.get()
          this.$store.dispatch('fullscreenLoading',false)
      },    
      jumpNews() {
        this.$router.push('/news')
      }
    }
  }
</script>

<style scoped>
#wrapper {
    background-color: #242d40;
    margin: 0;
    padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  cursor: pointer;
}

.title {
    color: #fff;
}

ul {
    padding: 0;
    margin: 0;
    column-gap:0;
    column-count: 2;
}
li {
    background-color: #fff;
    list-style-type: none;
    border-radius: 5px;
    break-inside: avoid;
    margin: 20px;
}

.li-content {
   padding: 20px;
}

.li-audio {
    width:100%;
    padding: 0 0 20px 0;
}


.li-audio > audio {
    width: 100%;
    outline-style:none;
}


.li-header > img {
    width: 100%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
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
