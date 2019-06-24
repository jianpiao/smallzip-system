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
        <el-menu
          theme="dark"
          unique-opened
          :router="true"
          class="el-menu-vertical-demo"
          :default-active="onRoutes"
        >
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
        <el-header style="display:flex; font-size: 12px;text-align:center;justify-content:flex-end">
          <div
            class="header-item"
            v-for="(item,index) in [{icon:'el-icon-question',title:'公告'},{icon:'el-icon-warning',title:'意见'},{icon:'el-icon-star-on',title:'退出'}]"
            :key="index"
          >
            <i :class="item.icon" class="user-icon"></i>
            <el-tooltip class="item" effect="dark" :content="item.title" placement="bottom">
              <span class="user-name" @click="loginDown(index)">{{item.title}}</span>
            </el-tooltip>
          </div>
        </el-header>
        <!-- 动态导航栏 -->
        <el-tabs
          v-model="editableTabsValue"
          type="card"
          closable
          @tab-remove="removeTab"
          @tab-click="tabClick"
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
  name: "HelloWorld",
  data() {
    return {
      editableTabsValue: "",
      editableTabs: [],
      fullscreenLoading:false,
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
          title: "列表",
          subs: [
            {
              index: "other",
              title: "其他"
            },
            {
              index: "test",
              title: "测试"
            }
          ]
        },
        {
          icon: "el-icon-location",
          index: "form",
          title: "表单"
        }
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
    //  监听左侧导航栏点击事件
    onRoutes() {
      this.openFullScreen()
      let index = this.$route.path.replace("/", "");
      this.addTab(index);
      return index;
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
    //  加载
    openFullScreen() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 500);
    },
    //  移除头部tab导航
    addTab(targetName) {
      //  判断如果数组里面是否有重复的对象
      if (!this.editableTabs.find(e => e.title === targetName)) {
        this.editableTabs.push({
          title: targetName,
          name: targetName
        });
      }
      this.editableTabsValue = targetName;
    },
    //  移除头部tab导航
    removeTab(targetName) {
      this.openFullScreen()
      let tabs = this.editableTabs;
      let activeName = this.editableTabsValue;
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            if (nextTab) {
              //  回到之前选中的tab
              activeName = nextTab.name;
              this.$router.replace(activeName);
            }
          }
        });
      }
      //  设置 回到之前的tab
      this.editableTabsValue = activeName;
      this.editableTabs = tabs.filter(tab => tab.name !== targetName);
    },
    //  点击选择中的tab 并且跳转到对应路由
    tabClick(tab) {
      this.openFullScreen()
      this.$router.replace(tab.name);
    }
  }
};
</script>
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
