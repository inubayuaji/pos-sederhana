<template>
  <div class="kasir">
    <div class="table-item">
      <v-container>
        <v-row>
          <v-col cols="12">
            <h1>Kasir</h1>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <router-view></router-view>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <div class="order-detail">
      <order-detail></order-detail>
    </div>

    <div class="notif">
      <notif></notif>
    </div>
  </div>
</template>

<script>
import OrderDetail from "../components/OrderDetail.vue";
import Notif from "../components/Notif.vue";

export default {
  components: { OrderDetail, Notif },
  name: "KasirPage",
  mounted() {
    this.$router.push({ name: "Kasir.Barang" }).catch(() => {});
    this.$store.dispatch("CHECK_STOK_BARANG");
  },
};
</script>

<style scoped>
.kasir {
  width: 100%;
  height: 100%;
  display: flex;
}
.table-item {
  width: calc(100% - 290px);
  height: 100%;
}
.order-detail {
  width: 290px;
  height: 100vh;
}
@media only screen and (min-width: 900px) {
  .table-item {
    width: calc(100% - 350px);
  }
  .order-detail {
    width: 350px;
  }
}
.h-100 {
  height: 100%;
}
</style>
