<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Admin</h1>
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
            <form-tambah></form-tambah>
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
                <confirm-hapus></confirm-hapus>
                <form-edit></form-edit>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormTambah from "../components/admin/FormTambah.vue";
import FormEdit from "../components/admin/FormEdit.vue";
import ConfirmHapus from "../components/admin/ConfirmHapus.vue";

export default {
  name: "AdminPage",
  components: {
    FormEdit,
    FormTambah,
    ConfirmHapus,
  },
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