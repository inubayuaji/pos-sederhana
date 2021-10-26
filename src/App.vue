<template>
  <div id="app">
    <v-app v-if="!login">
      <bar></bar>
      <div class="justify-center d-flex w-100 h-100 align-center">
        <div style="width: 300px" class="text-center">
          <h2>Login Kasir</h2>
          <v-text-field v-model="auth.username" label="Username"></v-text-field>
          <v-text-field
            v-model="auth.password"
            label="Password"
            type="password"
          ></v-text-field>
          <v-btn color="green" @click="attempt()">Login</v-btn>
        </div>
      </div>
    </v-app>
    <v-app v-else>
      <bar></bar>
      <side-nav></side-nav>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Bar from "./components/Bar.vue";
import SideNav from "./components/SideNav.vue";

export default {
  name: "App",
  components: {
    Bar,
    SideNav,
  },
  data() {
    return {
      auth: {
        username: "",
        password: "",
      },
      login: localStorage.getItem("login") == "true",
    };
  },
  methods: {
    async attempt() {
      await this.$store.dispatch("LOGIN_ADMIN", this.auth);
      setTimeout(() => {
        this.login = localStorage.getItem("login") == "true";
      }, 80);
    },
  },
};
</script>

<style scoped>
html {
  overflow: hidden !important;
}
.h-100 {
  height: 100%;
}
</style>