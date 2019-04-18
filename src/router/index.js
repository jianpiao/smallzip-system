import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login.vue'
Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },{
            path: '/Home',
            component: resolve => require(['../components/Container'], resolve),
            children:[
                {
                    path: '/',
                    component: resolve => require(['../components/Home.vue'], resolve)
                },{
                    path: '/home',
                    component: resolve => require(['../components/Home.vue'], resolve)
                },{
                    path: '/detail',
                    component: resolve => require(['../components/Detail.vue'], resolve)
                },{
                    path: '/other',
                    component: resolve => require(['../components/Other.vue'], resolve)
                },{
                    path: '/test',
                    component: resolve => require(['../components/Test.vue'], resolve)
                },
                {
                    path: '/form',
                    component: resolve => require(['../components/Form.vue'], resolve)
                },{
                    path: '/workplace',
                    component: resolve => require(['../components/Workplace.vue'], resolve)
                },{
                    path: '/member',
                    component: resolve => require(['../components/Member.vue'], resolve)
                }
            ]
        }
    ]
})
