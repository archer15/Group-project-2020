const state = {
  sidebar: {
    open: false
  }
}

const getters = {
  sidebar: state => state.sidebar
}

const mutations = {
  setSidebar (state, sidebar) {
    state.sidebar = sidebar
  }
}

const actions = {
  toggleSidebar ({ commit, getters }) {
    commit('setSidebar', {
      open: !getters.sidebar.open
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}