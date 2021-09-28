<template>
  <div id="app">
    <v-app>
      <v-system-bar window dark app color="#212121">
        <v-spacer></v-spacer>
        <v-icon small @click="minimizeWindow()">mdi-window-minimize</v-icon>

        <v-icon v-if="isMaximized" small @click="maximizeWindow()"
          >mdi-window-restore</v-icon
        >
        <v-icon v-else small @click="maximizeWindow()"
          >mdi-window-maximize</v-icon
        >

        <v-icon small @click="closeWindow()">mdi-window-close</v-icon>
      </v-system-bar>

      <v-navigation-drawer permanent expand-on-hover app>
        <v-list nav dense>
          <v-list-item link to="/">
            <v-list-item-icon>
              <v-icon>mdi-cash-register</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Kasir</v-list-item-title>
          </v-list-item>
          <v-list-item link href="/barang">
            <v-list-item-icon>
              <v-icon>mdi-package-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Barang</v-list-item-title>
          </v-list-item>
          <v-list-item link href="/admin">
            <v-list-item-icon>
              <v-icon>mdi-account-multiple</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
const { remote } = require("electron");

export default {
  name: "App",
  data() {
    return {
      isMaximized: true,
    };
  },
  methods: {
    getWindow() {
      return remote.BrowserWindow.getFocusedWindow();
    },
    closeWindow() {
      this.getWindow().close();
    },
    maximizeWindow() {
      const window = this.getWindow();

      if (window.isMaximized()) {
        this.isMaximized = false;
        window.unmaximize();
      } else {
        this.isMaximized = true;
        window.maximize();
      }
    },
    minimizeWindow() {
      this.getWindow().minimize();
    },
  },
  mounted() {
    this.isMaximized = this.getWindow().isMaximized();
  },
};
</script>

<style scoped>
html {
  overflow: hidden !important;
}
</style>