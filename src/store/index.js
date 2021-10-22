import Vue from "vue";
import Vuex from "vuex";
import { ipcRenderer } from "electron";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    admin: [],
  },
  mutations: {
    SET_ADMIN(state, payload) {
      state.admin = payload.admin;
    },
  },
  actions: {
    async GET_ADMIN(context) {
      ipcRenderer.invoke("GET_ADMIN").then((res) => {
        context.commit("SET_ADMIN", { admin: res });
      });
    },
    async SAVE_ADMIN(context, payload) {
      ipcRenderer.invoke("SAVE_ADMIN", payload.admin).then(() => {
        context.dispatch("GET_ADMIN");
      });
    },
    async UPDATE_ADMIN(context, payload) {
      ipcRenderer
        .invoke("UPDATE_ADMIN", payload.username, payload.admin)
        .then(() => {
          context.dispatch("GET_ADMIN");
        });
    },
    async DELETE_ADMIN(context, payload) {
      ipcRenderer.invoke("DELETE_ADMIN", payload.username).then(() => {
        context.dispatch("GET_ADMIN");
      });
    },
  },
  modules: {},
});
