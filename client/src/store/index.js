import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from "vuex-persistedstate";

import UiModule from './modules/ui'
import UserModule from './modules/user'
import NewsModule from './modules/news'
import TodoModule from './modules/todo'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui: UiModule,
    user: UserModule,
    news: NewsModule,
    todo: TodoModule
  },
  plugins: [
    createPersistedState({
      reducer: (persistedState) => {
          const stateFilter = JSON.parse(JSON.stringify(persistedState)); // deep clone
          delete stateFilter.ui.open // Don't persist sidebar state
          return stateFilter
      }
  }),
  ]
});
