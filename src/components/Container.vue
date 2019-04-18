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
          <div style="width:100%">
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
  </div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
  name: "Container",
  data() {
    return {
      editableTabsValue: "",
      editableTabs: [],
      breadcrumb:['首页'], //  面包屑
      screenHeight: 600, //  屏幕高度
      items: [
        //  路由地址
        {
          icon: "el-icon-location",
          index: "home",
          title: "首页"
        },
        {
          icon: "el-icon-location",
          index: "detail",
          title: "详情"
        },
        {
          icon: "el-icon-location",
          index: "2",
          title: "人力资源",
          subs: [
            {
              index: "other",
              title: "任务进度"
            },
            {
              index: "test",
              title: "文件上传"
            },{
              index: "workplace",
              title: "工作台"
            },
            {
              index: "member",
              title: "员工管理"
            }
          ]
        },
        {
          icon: "el-icon-location",
          index: "form",
          title: "表单"
        }
      ],
      headerList:[
        {icon:'el-icon-location',title:'项目地址'},
        {icon:'el-icon-question',title:'公告'},
        {icon:'el-icon-warning',title:'意见'},
        {icon:'el-icon-star-on',title:'退出'}
        ]
    };
  },
  mounted() {
    //  监听可视区域高度
    this.screenHeight = document.documentElement.clientHeight;
    window.onresize = () => {
      this.screenHeight = document.documentElement.clientHeight;
    };
  },
  computed: {
    onRoutes() {
      let index = this.$route.path.replace('/','')
      this.addTab(index)
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
      if (index == 2) {
        this.$router.replace("/login");
      }
    },
    //  点击头部tab
    tabClick(tab) {
      new Promise(() => {
        this.$store.dispatch('fullscreenLoading',true)
      })
      this.routerName(tab.name)
      this.changeBreadcrumb(tab.name)
      this.editableTabsValue = tab.name
      this.$router.replace(tab.name)
    },
    //  添加头部路由
    addTab(targetName) {
      new Promise(() => {
        this.$store.dispatch('fullscreenLoading',true)
      })
      //  判断没有找到tab导航则添加
      if(!this.editableTabs.find(tab => tab.name === targetName)) {
        this.editableTabs.push({
          title: this.routerName(targetName),
          name: targetName
        });
      }
      this.changeBreadcrumb(targetName)
      this.editableTabsValue = targetName;
    },
    //  移除头部tab
    tabRemove(targetName) {
      new Promise(() => {
        this.$store.dispatch('fullscreenLoading',true)
      })
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
        this.routerName(activeName)
        this.changeBreadcrumb(activeName)
        this.editableTabsValue = activeName;
        this.editableTabs = this.editableTabs.filter(tab => tab.name !== targetName);
        this.$router.replace(activeName)
    },
    //  路由名称过滤
    routerName(i) {
      let routers = {
        'container':'首页',
        'home':'首页',
        'detail':'详情',
        'other':'任务进度',
        'form':'表单',
        'test':'文件上传',
        'workplace':'工作台',
        'member':'员工管理'
      }
      return routers[i]
    },
    //  面包屑导航
    changeBreadcrumb(i) {
      //  改变面包屑
      switch (i) {
        case 'container':
          this.breadcrumb = ['首页']
          break;
        case 'home':
          this.breadcrumb = ['首页']
          break;
          case 'detail':
          this.breadcrumb = ['详情']
          break;
        case 'other':
          this.breadcrumb = ['人力资源','任务进度']
          break;
        case 'form':
          this.breadcrumb = ['表单']
          break;
        case 'test':
          this.breadcrumb = ['人力资源','文件上传']
          break;
        case 'workplace':
          this.breadcrumb = ['人力资源','工作台']
          break;
        case 'member':
          this.breadcrumb = ['人力资源','员工管理']
          break;
        default:
          break;
      }
    },
    jump(i) {
      if(i==0){
        window.open('https://github.com/jianpiao/glsyj_management')
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
