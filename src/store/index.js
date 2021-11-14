import Vue from "vue";
import Vuex from "vuex";
import { ipcRenderer } from "electron";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    notif: {
      show: false,
      message: "",
    },
    admin: [],
    barang: [],
    jasa: [],
    orderList: [],
    barangHabis: [],
    maxPages: 1,
    isStokHabis: false,
  },
  mutations: {
    SET_LOGIN(state, payload) {
      state.login = payload.login;
    },
    SHOW_NOTIF(state, payload) {
      state.notif.show = true;
      state.notif.message = payload.message;
    },
    CLOSE_NOTIF(state) {
      state.notif.show = false;
      state.notif.message = "";
    },
    SET_MAX_PAGES(state, payload) {
      state.maxPages = payload.maxPages;
    },
    SET_ADMIN(state, payload) {
      state.admin = payload.admin;
    },
    SET_BARANG(state, payload) {
      state.barang = payload.barang;
    },
    SET_BARANG_HABIS(state, payload) {
      state.barangHabis = payload.barang;
    },
    SET_JASA(state, payload) {
      state.jasa = payload.jasa;
    },
    ADD_ORDER(state, payload) {
      console.log(payload);
      var i = state.orderList.findIndex(
        (order) => order.itemId == payload.order.itemId
      );

      if (i == -1) {
        state.orderList.push(payload.order);
      }
    },
    DELETE_ORDER(state, payload) {
      state.orderList = state.orderList.filter(function(order) {
        var match = false;

        if (order.itemId == payload.id && order.type == payload.type) {
          match = true;
        }

        return !match;
      });
    },
    RESET_ORDER(state) {
      state.orderList = [];
    },
    UPDARE_SIZE_ORDER(state, payload) {
      var i = state.orderList.findIndex(
        (order) => order.itemId == payload.id && order.type == payload.type
      );

      state.orderList[i].jumlah = payload.jumlah;
    },
    SET_STOk_STATUS(state, payload) {
      state.isStokHabis = payload.status;
    },
  },
  actions: {
    async GET_ADMIN(context, payload) {
      ipcRenderer.invoke("GET_ADMIN", payload).then((res) => {
        context.commit("SET_ADMIN", { admin: res.data });
        context.commit("SET_MAX_PAGES", { maxPages: res.maxPages });
      });
    },
    async SAVE_ADMIN(context, payload) {
      ipcRenderer.invoke("SAVE_ADMIN", payload.admin).then(() => {
        context.dispatch("GET_ADMIN", {
          search: "",
          page: 1,
        });
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
    async LOGIN_ADMIN(context, payload) {
      ipcRenderer.invoke("LOGIN_ADMIN", payload).then((res) => {
        localStorage.setItem("login", res.login);
      });
    },

    async GET_BARANG(context, payload) {
      ipcRenderer.invoke("GET_BARANG", payload).then((res) => {
        context.commit("SET_BARANG", { barang: res.data });
        context.commit("SET_MAX_PAGES", { maxPages: res.maxPages });
      });
    },
    async SAVE_BARANG(context, payload) {
      ipcRenderer.invoke("SAVE_BARANG", payload.barang).then(() => {
        context.dispatch("GET_BARANG", {
          search: "",
          page: 1,
        });
      });
    },
    async UPDATE_BARANG(context, payload) {
      ipcRenderer
        .invoke("UPDATE_BARANG", payload.id, payload.barang)
        .then(() => {
          context.dispatch("GET_BARANG", {
            search: "",
            page: 1,
          });
        });
    },
    async DELETE_BARANG(context, payload) {
      ipcRenderer.invoke("DELETE_BARANG", payload.id).then(() => {
        context.dispatch("GET_BARANG", {
          search: "",
          page: 1,
        });
      });
    },
    async SCAN_BARANG(context, payload) {
      ipcRenderer.invoke("SCAN_BARANG", payload.barcode).then((res) => {
        context.commit("ADD_ORDER", {
          order: {
            itemId: res.id,
            type: "barang",
            nama: res.nama,
            harga_beli: res.harga_beli,
            harga: res.harga,
            jumlah: 1,
          },
        });
      });
    },
    async CHECK_JUMLAH_BARANG(context, payload) {
      return ipcRenderer
        .invoke("CHECK_JUMLAH_BARANG", payload.barang)
        .then((res) => {
          return res;
        });
    },
    async SET_JUMLAH_BARANG(context, payload) {
      ipcRenderer
        .invoke("SET_JUMLAH_BARANG", payload.id, payload.jumlah);
    },
    async SUB_JUMLAH_BARANG(context, payload) {
      ipcRenderer
        .invoke("SUB_JUMLAH_BARANG", payload.id, payload.jumlah)
        .then(() => {
          context.dispatch("GET_BARANG", {
            search: "",
            page: 1,
          });
        });
    },
    async CHECK_STOK_BARANG(context) {
      ipcRenderer.invoke("CHECK_STOK_BARANG").then((res) => {
        context.commit("SET_STOk_STATUS", { status: res });
      });
    },
    async GET_HABIS_BARANG(context, payload) {
      ipcRenderer.invoke("GET_HABIS_BARANG", payload).then((res) => {
        context.commit("SET_BARANG_HABIS", { barang: res.data });
        context.commit("SET_MAX_PAGES", { maxPages: res.maxPages });
      });
    },

    async GET_JASA(context, payload) {
      ipcRenderer.invoke("GET_JASA", payload).then((res) => {
        context.commit("SET_JASA", { jasa: res.data });
        context.commit("SET_MAX_PAGES", { maxPages: res.maxPages });
      });
    },
    async SAVE_JASA(context, payload) {
      ipcRenderer.invoke("SAVE_JASA", payload.jasa).then(() => {
        context.dispatch("GET_JASA", {
          search: "",
          page: 1,
        });
      });
    },
    async UPDATE_JASA(context, payload) {
      ipcRenderer.invoke("UPDATE_JASA", payload.id, payload.jasa).then(() => {
        context.dispatch("GET_JASA", {
          search: "",
          page: 1,
        });
      });
    },
    async DELETE_JASA(context, payload) {
      ipcRenderer.invoke("DELETE_JASA", payload.id).then(() => {
        context.dispatch("GET_JASA", {
          search: "",
          page: 1,
        });
      });
    },

    async SAVE_ORDER(context, payload) {
      ipcRenderer.invoke("SAVE_ORDER", payload.orderList);
    },
  },
  modules: {},
});
