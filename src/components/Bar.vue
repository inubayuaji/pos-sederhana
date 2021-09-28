<template>
  <v-system-bar window dark app color="#212121">
    <span>Kasir Alkaf</span>
    <v-spacer></v-spacer>
    <v-icon small @click="minimizeWindow()">mdi-window-minimize</v-icon>

    <v-icon v-if="isMaximized" small @click="maximizeWindow()"
      >mdi-window-restore</v-icon
    >
    <v-icon v-else small @click="maximizeWindow()">mdi-window-maximize</v-icon>

    <v-icon small @click="closeWindow()">mdi-window-close</v-icon>
  </v-system-bar>
</template>

<script>
const { remote } = require("electron");

export default {
  name: 'Bar',
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