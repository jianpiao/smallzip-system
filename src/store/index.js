//  引入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const state = {
    fullscreenLoading: false
}

const mutations = {
    FULL_SCREEN_LOADING( state,i ) {
        state.fullscreenLoading = i
    }
}

const actions = {
    fullscreenLoading: ({ commit },i) => {
        commit('FULL_SCREEN_LOADING',i)
    }
}

const getters = {
    fullscreenLoading: fullscreenLoading => state.fullscreenLoading
}


export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
})