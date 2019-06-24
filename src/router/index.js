import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/Home',
            component: resolve => require(['../components/Container'], resolve),
            children: [{
                    path: '/',
                    component: resolve => require(['../components/Home.vue'], resolve),
                    title: "首页",
                    icon: "el-icon-location",
                }, {
                    path: '/home',
                    component: resolve => require(['../components/Home.vue'], resolve),
                    title: "首页",
                    icon: "el-icon-location",
                }, {
                    path: '/lock',
                    component: resolve => require(['../views/Lock.vue'], resolve),
                    title: "智能锁",
                    icon: "el-icon-location",
                }, {
                    path: '/detail',
                    component: resolve => require(['../components/Detail.vue'], resolve),
                    title: "详情",
                    icon: "el-icon-location",
                }, {
                    path: '/other',
                    component: resolve => require(['../components/Other.vue'], resolve),
                    title: "任务进度",
                    icon: "el-icon-location",
                    subTitle: '人力资源',
                    subIndex: '2',
                    subIcon: "el-icon-location",
                }, {
                    path: '/test',
                    component: resolve => require(['../components/Test.vue'], resolve),
                    title: "文件上传",
                    icon: "el-icon-location",
                    subTitle: '人力资源',
                    subIndex: '2',
                    subIcon: "el-icon-location",
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/Form.vue'], resolve),
                    title: "表单",
                    icon: "el-icon-location",
                }, {
                    path: '/workplace',
                    component: resolve => require(['../components/Workplace.vue'], resolve),
                    title: "工作台",
                    icon: "el-icon-location",
                    subTitle: '人力资源',
                    subIndex: '2',
                    subIcon: "el-icon-location",
                }, {
                    path: '/member',
                    component: resolve => require(['../components/Member.vue'], resolve),
                    title: "员工管理",
                    icon: "el-icon-location",
                    subTitle: '人力资源',
                    subIndex: '2',
                    subIcon: "el-icon-location",
                },
                {
                    path: '/xima',
                    component: resolve => require(['../components/Xima.vue'], resolve),
                    title: "喜马拉雅",
                    icon: "el-icon-location",
                },
                {
                    path: '/copy',
                    component: resolve => require(['../components/CopyTest.vue'], resolve),
                    title: "禁止复制",
                    icon: "el-icon-location",
                },
                {
                    path: '/music',
                    component: resolve => require(['../components/Music.vue'], resolve),
                    title: "音乐",
                    icon: "el-icon-location",
                },
                {
                    path: '/singerDetail',
                    component: resolve => require(['../components/SingerDetail.vue'], resolve),
                    type: 'not', //  不在侧栏显示
                    name: 'singerDetail',
                    params: {
                        id: ''
                    }
                },
                {
                    path: '/cmLogin',
                    component: resolve => require(['../views/cloudMusic/CMLoginState.vue'], resolve),
                    title: "网易云音乐",
                    icon: "el-icon-location",
                },
                {
                    path: '/cloudMusic',
                    component: resolve => require(['../views/cloudMusic/CloudMusic.vue'], resolve),
                    type: 'not', //  不在侧栏显示
                },
                {
                    path: '/cmSingerDetail',
                    component: resolve => require(['../views/cloudMusic/CMSingerDetail.vue'], resolve),
                    type: 'not', //  不在侧栏显示
                },
                {
                    path: '/cmSingerHotList',
                    component: resolve => require(['../views/cloudMusic/CMSingerHotList.vue'], resolve),
                    type: 'not', //  不在侧栏显示
                },
            ]
        }
    ]
})