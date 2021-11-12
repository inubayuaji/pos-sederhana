<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <h1>Kasir</h1>
          </v-col>
        </v-row>

        <router-view></router-view>
      </v-col>

      <v-col cols="4" class="h-100">
        <order-detail></order-detail>
      </v-col>
    </v-row>

    <notif></notif>
  </v-container>
</template>

<script>
import OrderDetail from "../components/OrderDetail.vue";
import Notif from "../components/Notif.vue";

export default {
  components: { OrderDetail, Notif },
  name: "KasirPage",
  mounted() {
    this.$router.push({ name: "Kasir.Barang" });
  },
};
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
