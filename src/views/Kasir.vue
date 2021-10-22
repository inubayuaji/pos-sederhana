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
              :items="desserts"
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
                  <td>{{ row.item.name }}</td>
                  <td>{{ row.item.category }}</td>
                  <td class="d-flex justify-end">
                    <!-- <confirm-hapus></confirm-hapus>
                    <form-edit></form-edit> -->
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
        {
          text: "Dessert (100g serving)",
          align: "start",
          value: "name",
        },
        { text: "Category", value: "category" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          category: "Ice cream",
        },
        {
          name: "Ice cream sandwich",
          category: "Ice cream",
        },
        {
          name: "Eclair",
          category: "Cookie",
        },
        {
          name: "Cupcake",
          category: "Pastry",
        },
        {
          name: "Gingerbread",
          category: "Cookie",
        },
        {
          name: "Jelly bean",
          category: "Candy",
        },
        {
          name: "Lollipop",
          category: "Candy",
        },
        {
          name: "Honeycomb",
          category: "Toffee",
        },
        {
          name: "Donut",
          category: "Pastry",
        },
        {
          name: "KitKat",
          category: "Candy",
        },
      ],
    };
  },
};
</script>

<style scoped>
.h-100 {
  height: 100%;
}
</style>
