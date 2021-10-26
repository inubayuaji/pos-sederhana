import Vue from "vue";
import VueRouter from "vue-router";
import Kasir from "../views/Kasir.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Kasir",
    component: Kasir,
  },
  {
    path: "/barang",
    name: "Barang",
    component: () => import("../views/Barang.vue"),
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
      next({ name: "Kasir" });
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
