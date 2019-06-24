<template>
  <div class="hello">
    <el-container style=" border: 1px solid #eee" :style="{height:screenHeight+'px'}" v-loading.fullscreen.lock="fullscreenLoading">
      <!-- 侧栏 -->
      <el-aside width="250px" style="background-color: #fff;">
        <div>
          <div style="height:60px;text-align:center;">
            <h1 style="color:#409EFF;margin:0;line-height:60px;">LOGO</h1>
          </div>
          <div style="display:flex;padding:20px;justify-content:center">
            <img
              width="50"
              height="50"
              src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1555304257327&di=2ccd831dbf790612c56472eb43041649&imgtype=0&src=http%3A%2F%2Fimg2018.cnblogs.com%2Fblog%2F1272179%2F201812%2F1272179-20181209174143070-321761922.jpg"
              alt="img"
            >
            <div style="padding:0 10px;font-size:13px;color:#777;line-height:25px">
              <span>小飘飘</span>
              <br>
              <span>技术部前端</span>
            </div>
          </div>
        </div>
        <!-- 侧栏导航 -->
        <el-menu theme="dark" unique-opened :router="true" class="el-menu-vertical-demo" :default-active="onRoutes">
          <template v-for="item in items">
            <template v-if="item.subs">
              <el-submenu :index="item.index" :key="item.index">
                <template slot="title">
                  <i :class="item.icon"></i>
                  {{ item.title }}
                </template>
                <el-menu-item
                  v-for="(subItem,i) in item.subs"
                  :key="i"
                  :index="subItem.index"
                >{{ subItem.title }}</el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.index" :key="item.index">
                <i :class="item.icon"></i>
                {{ item.title }}
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <!-- 头部 -->
      <el-container>
        <el-header class="header">
          <div style="flex:1;">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{item}}</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div
            class="header-item"
            v-for="(item,index) in headerList"
            :key="index"
            @click="jump(index)"
          >
            <i :class="item.icon" class="user-icon"></i>
            <el-tooltip class="item" effect="dark" :content="item.title" placement="bottom">
              <span class="user-name" @click="loginDown(index)">{{item.title}}</span>
            </el-tooltip>
          </div>
        </el-header>
        <!-- 头部动态导航栏 -->
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-click="tabClick"
          @tab-remove="tabRemove"
          class="header-tabs"
        >
          <el-tab-pane
            :key="item.name"
            v-for="item in editableTabs"
            :label="item.title"
            :name="item.name"
          ></el-tab-pane>
        </el-tabs>
        <!-- 内容展示区域 -->
        <div :style="{height:(screenHeight-60)+'px'}" class="content">
          <router-view/>
        </div>
      </el-container>
    </el-container>
    <!-- <MusicPlay/> -->
  </div>
</template>

<script>
import { Loading } from 'element-ui'
import routes from '@/router/index'
export default {
  name: "Container",
  data() {
    return {
      editableTabsValue: "",
      editableTabs: [],
      breadcrumb:['首页'], //  面包屑
      screenHeight: 600, //  屏幕高度
      items: [],
      headerList:[
        {icon:'el-icon-question',title:'公告'},
        {icon:'el-icon-warning',title:'意见'},
        {icon:'el-icon-star-on',title:'退出'}
        ],
        curRouter: ''  //  当前的路由名称
    };
  },
  mounted() {
    //  监听可视区域高度
    this.screenHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      this.screenHeight = document.documentElement.clientHeight;
    }
    //  获取路由
    let tempRouter = routes.options.routes[2].children
    let tempS = false
    let tempI = 0
    tempRouter.forEach((item,index) => {
      //  首先排除type为not的
      if (item.type != 'not') {
        tempS ? '' : tempI = index //  不存在则记录
        if(item.subIndex || item.subTitle || item.subIcon) {
          tempS = false
          this.items.forEach((sItem,sIndex) => {
            if (sItem.index == item.subIndex || sItem.title == item.subIndex) {
              tempS = true
            }
          })
          //  如果已经存在
          if (tempS) {
            this.items[tempI - 1].subs.push({
              index: item.path.substr(1),
              title: item.title,
            })
          } else {
            this.items.push({
              icon: item.subIcon,
              index: item.subIndex,
              title: item.subTitle,
              subs:[]
            })
          }
        } else {
          this.items.push({
            icon: item.icon,
            index: item.path.substr(1),
            title: item.title
          })
        }
      }
    })
    this.items = this.items.filter(e => e.index !== '')
  },
  computed: {
    onRoutes() {
      let index = this.$route.path.replace('/','')
      if (index == `singerDetail` || 
          index == `cmSingerDetail` ||
          index == `cmLogin` || 
          index == `cmSingerHotList`) return;
      this.addTab(index)
      this.curRouter = index
      return index
    },
    fullscreenLoading() {
      return this.$store.getters.fullscreenLoading
    }
  },
  watch: {
    //  监听可视区域高度
    screenHeight() {
      this.changePageHeight(this.screenHeight);
    }
  },
  methods: {
    changePageHeight(h) {
      //  改变高度
      this.screenHeight = h;
    },
    //  退出登陆
    loginDown(index) {
      if (index == 3) {
        this.$router.replace("/login");
      }
    },
    //  点击头部tab
    tabClick(tab) {
      //  如果点击的路由和当前的路由一致则不需要跳转
      if (tab.name == this.curRouter) return;
      this.$store.dispatch('fullscreenLoading',true)
      this.changeBreadcrumb(tab.name)
      this.editableTabsValue = tab.name
      this.$router.replace(tab.name)
    },
    //  添加头部路由
    addTab(targetName) {
      //  判断没有找到tab导航则添加
      if(!this.editableTabs.find(tab => tab.name === targetName)) {
        this.editableTabs.push({
          title: this.routerName(targetName),
          name: targetName
        })
        this.$store.dispatch('fullscreenLoading',true)
      }
      this.changeBreadcrumb(targetName)
      this.editableTabsValue = targetName;
    },
    //  移除头部tab
    tabRemove(targetName) {
      this.$store.dispatch('fullscreenLoading',true)
      let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                //  选中上一个tab
                activeName = nextTab.name;
              }
            }
          });
        }
        //  回到上一个tab
        this.changeBreadcrumb(activeName)
        this.editableTabsValue = activeName;
        this.editableTabs = this.editableTabs.filter(tab => tab.name !== targetName);
        this.$router.replace(activeName)
    },
    //  路由名称过滤
    routerName(i) {
      return routes.options.routes[2].children.find(e => e.path.substr(1) == i).title
    },
    //  面包屑导航
    changeBreadcrumb(i) {
      this.breadcrumb = []
      this.items.map((item,index) => {
        if (item.subs) {
          //  path包含
          item.subs.forEach(e => {
            if (e.index == i) {
              this.breadcrumb.push(item.title)
              this.breadcrumb.push(e.title)
            }
          })
        } else {
          item.index == i ? this.breadcrumb.push(item.title) : null
        }
      })
    },
    jump(i) {
      if(i==0){
        // shell.openExternal('https://github.com/jianpiao/smallzip-system')
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  z-index: 9;
}

.header {
  display:flex; 
  font-size: 12px;
  justify-content:flex-end
}

.el-breadcrumb {
  line-height: 60px;
}

.header-tabs {
  margin: 0;
  -webkit-box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 99;
  height: 41px;
  overflow: hidden;
}

.el-tabs--card > .el-tabs__header {
  border: none;
}

.content {
  overflow-y: scroll;
  background-color: #f5f5f5;
}

.header-item {
  width: 100px;
  text-align:center;
  font-size: 14px;
}

.user-name,
.user-icon {
  cursor: pointer;
  color: #999;
}

.user-icon {
  margin-right: 8px;
}
</style>
