import UserApi from '@/services/api/user.api.js'

const state = {
  user: {},
  token: null
}

const getters = {
  auth: state => !!(state.token),
  token: state => state.token,
  user: state => state.user,
  username: state => state.user?.username,
  firstName: state => state.user?.firstName,
  photo: state => state.user?.photo
}

const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setToken (state, token) {
    state.token = token
  }
}

const actions = {
  async login ({ commit }, payload) {
    const response = await UserApi.Login(payload)

    const { token, user } = response.data
    commit('setUser', user)
    commit('setToken', token)

    return user
  },

  async register ({commit}, payload) {
    const response = await UserApi.Register(payload)
    const {token, user} = response.data
    commit('setUser', user)
    commit('setToken', token)
  },

  logout ({ commit }) {
    commit('setUser', {})
    commit('setToken', null)
  },

  async update ({ commit, getters }, payload) {
    const response = await UserApi.Update(getters.token, payload)

    const { token, user } = response.data
    commit('setUser', user)
    commit('setToken', token)

    return user
  },

  async updatePhoto ({ commit, getters }, payload) {
    const response = await UserApi.UpdatePhoto(getters.token, payload)

    const { token, user } = response.data
    commit('setUser', user)
    commit('setToken', token)

    return user
  },

  async changePassword ({ commit, getters }, payload) {
    const response = await UserApi.UpdatePassword(getters.token, payload)

    const { token, user } = response.data
    commit('setUser', user)
    commit('setToken', token)

    return user
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}