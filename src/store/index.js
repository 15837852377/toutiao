import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const tokenKey = "toutiao_token";
import { getLocal, setLocal } from "@/utils/storage";
export default new Vuex.Store({
  state: {
    user: getLocal(tokenKey),
  },
  getters: {},
  mutations: {
    // Token 存储
    // 存储到本地是为了数据持久化 防止刷新后丢失上一次的数据状态
    // 存储到vuex是为了更方便快速的获取Token数据 但是在页面刷新时还是会先向本地存储获取数据状态
    setUser(state, user) {
      state.user = user;
      setLocal(tokenKey, user);
    },
  },
  actions: {},
  modules: {},
});
