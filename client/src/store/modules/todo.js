import TodoApi from '@/services/api/todo.api'

const state = {
  todos: []
}

const getters = {
  todos: state => state.todos
}

const mutations = {
  setTodo (state, todos) {
    state.todos = todos
  },
  addTodo (state, todo) {
    state.todos.push(todo)
  }
}

const actions = {
  async addTodo ({ commit, rootGetters }, todo) {
    const token = rootGetters['user/token']
    const response = await TodoApi.AddTodo(todo, token)
    const todos = response.data?.todos
    commit('setTodo', todos)

    return todos
  },

  async getTodos ({ commit, rootGetters }) {
    const token = rootGetters['user/token']
    const response = await TodoApi.GetTodos(token)
    const todos = response.data?.todos
    commit('setTodo', todos)

    return todos
  },

  async removeTodo ({ commit, rootGetters }, todo) {
    const token = rootGetters['user/token']
    const response = await TodoApi.RemoveTodo(todo, token)
    const todos = response.data?.todos
    commit('setTodo', todos)

    return todos
  },

  async completeTodo ({ commit, rootGetters }, todo) {
    const token = rootGetters['user/token']
    const response = await TodoApi.CompleteTodo(todo, token)
    const todos = response.data?.todos
    commit('setTodo', todos)

    return todos
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}