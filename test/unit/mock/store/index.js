import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    user: null,
    items: [],
  },
  mutations: {
    showLoading(state) {
      state.isLoading = true;
    },
    hideLoading(state) {
      state.isLoading = false;
    },

    /* User */
    setUser(state, user) {
      state.user = user;
    },
    removeUser(state) {
      state.user = null;
    },

    /* Items */
    resetItems(state) {
      state.items = [];
    },
    setItems(state, items) {
      state.items = items;
    },
    appendItems(state, items) {
      state.items = state.items.concat(items);
    },
  },
});
