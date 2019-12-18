import Vue from 'vue'
import Vuex from 'vuex'
import http from "../utils/http";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {}
  },
  getters: {
    userInfo: state => state.userInfo ? state.userInfo : {}
  },
  mutations: {
  },
  actions: {
    async login({ state }, params) {
      const data = await http.post('user/login', params)
      state.userInfo = data.data
      return data
    },
    async logout({ state }) {
      const { _id } = state.userInfo;
      const { success } = await http.post("/user/logout", { _id });
      if (success) state.userInfo = {}
    }
  },
  modules: {
  }
})
