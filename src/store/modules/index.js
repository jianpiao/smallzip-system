const Index = {
    state :{
        fullscreenLoading: false,
        showMusicPlay:'none',
        playurl:'http://dl.stream.qqmusic.qq.com/C400001p6IYC41TCVn.m4a?guid=5741524946&vkey=54948D45C07D7A3464EE7A60A90B30FEA602A9B889D00B0FF1AFC689BA1AA036E8A449A2DB69B4EAEC00EC9F5028DC7E61F0D87B14A4921C&uin=0&fromtag=38'
    },
    mutations: {
        FULL_SCREEN_LOADING( state,i ) {
            state.fullscreenLoading = i
        },
        SHOW_MUSIC_PLAY( state,i ) {
            state.showMusicPlay = i
        },
        PLAY_URL( state,i ) {
            state.playurl = i
        }
    },
    actions: {
        fullscreenLoading: ({ commit },i) => {
            commit('FULL_SCREEN_LOADING',i)
        },
        showMusicPlay: ({ commit },i) => {
            commit('SHOW_MUSIC_PLAY',i)
        },
        playurl: ({ commit },i) => {
            commit('PLAY_URL',i)
        }
    }
}

export default Index