import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import store from './store'
import onScan from "onscan.js";

Vue.config.productionTip = false

onScan.attachTo(document, {
  onScan(barcode) {
    store.dispatch("SCAN_BARANG", {
      barcode: barcode,
    });
  },
});

window.onScan = onScan;

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
