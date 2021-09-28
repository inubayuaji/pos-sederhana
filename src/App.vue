<template>
  <div id="app">
    <v-app>
      <bar></bar>
      <side-nav></side-nav>
      <v-main>
        <router-view></router-view>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import Bar from './components/Bar.vue'
import SideNav from './components/SideNav.vue'

export default {
  name: "App",
  components: {
    Bar,
    SideNav
  },
};
</script>

<style scoped>
html {
  overflow: hidden !important;
}
</style>