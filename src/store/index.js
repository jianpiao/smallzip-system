//  引入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'
import cloudMusic from './modules/cloudMusic'
import Index from './modules/index'

Vue.use(Vuex)

const state = {
    fullscreenLoading: false,
    showMusicPlay: 'none',
    playurl: 'http://dl.stream.qqmusic.qq.com/C400001p6IYC41TCVn.m4a?guid=5741524946&vkey=54948D45C07D7A3464EE7A60A90B30FEA602A9B889D00B0FF1AFC689BA1AA036E8A449A2DB69B4EAEC00EC9F5028DC7E61F0D87B14A4921C&uin=0&fromtag=38'
}


const getters = {
    fullscreenLoading: fullscreenLoading => Index.fullscreenLoading,
    showMusicPlay: showMusicPlay => Index.showMusicPlay,
    playurl: playurl => Index.playurl,
    userinfo: userinfo => state.cloudMusic.userinfo
}


export default new Vuex.Store({
    modules: {
        cloudMusic,
        Index
    },
    getters
})