import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import store from './store/index'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
