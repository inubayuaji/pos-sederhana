import Vue from "vue";
import Vuex from "vuex";
import { ipcRenderer } from "electron";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    admin: [],
    barang: [],
    orderList: [
      { barangId: "1213ijf", nama: "Buku", harga: 10000, jumlah: 1 },
      { barangId: "fdniert", nama: "Pensil", harga: 5000, jumlah: 3 },
    ],
  },
  mutations: {
    SET_ADMIN(state, payload) {
      state.admin = payload.admin;
    },
    SET_BARANG(state, payload) {
      state.barang = payload.barang;
    },
    DELETE_ORDER(state, payload) {
      state.orderList = state.orderList.filter(function(order) {
        return order.barangId != payload.id;
      });
    },
    RESET_ORDER(state) {
      state.orderList = [];
    },
    UPDARE_SIZE_ORDER(state, payload) {
      var i = state.orderList.findIndex(
        (order) => order.barangId == payload.id
      );

      state.orderList[i].jumlah = payload.jumlah;
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

    async GET_BARANG(context) {
      ipcRenderer.invoke("GET_BARANG").then((res) => {
        context.commit("SET_BARANG", { barang: res });
      });
    },
    async SAVE_BARANG(context, payload) {
      ipcRenderer.invoke("SAVE_BARANG", payload.barang).then(() => {
        context.dispatch("GET_BARANG");
      });
    },
    async UPDATE_BARANG(context, payload) {
      ipcRenderer
        .invoke("UPDATE_BARANG", payload.id, payload.barang)
        .then(() => {
          context.dispatch("GET_BARANG");
        });
    },
    async DELETE_BARANG(context, payload) {
      ipcRenderer.invoke("DELETE_BARANG", payload.id).then(() => {
        context.dispatch("GET_BARANG");
      });
    },
    async SET_JUMLAH_BARANG(context, payload) {
      ipcRenderer
        .invoke("SET_JUMLAH_BARANG", payload.id, payload.jumlah)
        .then(() => {
          context.dispatch("GET_BARANG");
        });
    },
  },
  modules: {},
});
