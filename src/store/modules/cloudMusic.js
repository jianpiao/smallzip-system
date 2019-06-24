const cloudMusic = {
    state: {
        userinfo: ``,
    },
    mutations: {
        USER_INFO(state, i) {
            state.userinfo = i
        },
    },
    actions: {
        userinfo: ({ commit }, i) => {
            commit('USER_INFO', i)
        },
    }
}

export default cloudMusic