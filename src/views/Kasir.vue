<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col cols="8">
        <v-row>
          <v-col cols="12">
            <h1>Kasir</h1>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col cols="8">
            <v-row>
              <v-col cols="4">
                <v-text-field label="Cari"></v-text-field>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row justify="end">
              <v-col cols="12" class="d-flex justify-end">
                <!-- Button -->
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-data-table
          :headers="headers"
          :items="barang"
          :items-per-page="5"
          item-key="name"
          class="elevation-1"
          :footer-props="{
            prevIcon: 'mdi-arrow-left',
            nextIcon: 'mdi-arrow-right',
          }"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.id }}</td>
              <td>{{ row.item.barcode }}</td>
              <td>{{ row.item.nama }}</td>
              <td>{{ row.item.jumlah }}</td>
              <td class="d-flex justify-end">
                <v-btn icon color="green">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="4" class="h-100">
        <order-detail></order-detail>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import OrderDetail from '../components/OrderDetail.vue';
export default {
  components: { OrderDetail },
  name: "KasirPage",
  data() {
    return {
      headers: [
        { text: "ID", value: "id"},
        { text: "Barcode", value: "barcode"},
        { text: "Nama", value: "nama"},
        { text: "Jumlah", value: "jumlah" },
      ],
    };
  },
  computed: {
    barang() {
      return this.$store.state.barang
    }
  },
  mounted() {
    this.$store.dispatch("GET_BARANG");
  }
};
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
