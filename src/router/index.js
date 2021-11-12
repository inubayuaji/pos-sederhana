import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/index";
import Kasir from "../views/Kasir.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/kasir",
  },
  {
    path: "/kasir",
    name: "Kasir",
    component: Kasir,
    children: [
      {
        path: "/kasir/barang",
        name: "Kasir.Barang",
        component: () => import("../views/KasirBarangTable"),
      },
      {
        path: "/kasir/jasa",
        name: "Kasir.Jasa",
        component: () => import("../views/KasirJasaTable"),
      },
    ],
  },
  {
    path: "/barang",
    name: "Barang",
    component: () => import("../views/Barang.vue"),
  },
  {
    path: "/jasa",
    name: "Jasa",
    component: () => import("../views/Jasa.vue"),
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
  },
  {
    path: "/logout",
    name: "Logout",
    beforeEnter(to, from, next) {
      localStorage.setItem("login", false);
      store.commit("SET_LOGIN", { login: false });
      next({ name: "Kasir" });
    },
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? "hash" : "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
