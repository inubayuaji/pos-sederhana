<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Barang</h1>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="8">
        <v-row>
          <v-col cols="4">
            <v-text-field label="Cari" v-model="search" @keyup="filterTable"></v-text-field>
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
          :items="barang"
          :items-per-page="5"
          item-key="name"
          class="elevation-1"
          :hide-default-footer="true"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.id }}</td>
              <td>{{ row.item.barcode }}</td>
              <td>{{ row.item.nama }}</td>
              <td>Rp {{ row.item.harga }}</td>
              <td>{{ row.item.jumlah }}</td>
              <td class="d-flex justify-end">
                <confirm-hapus :barang-id="row.item.id"></confirm-hapus>
                <form-edit :barang-id="row.item.id" :barang="row.item"></form-edit>
                <form-set-jumlah :barang-id="row.item.id" :jumlah="row.item.jumlah"></form-set-jumlah>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-pagination
          v-model="page"
          :length="maxPages"
          @input="filterTable()"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import FormTambah from "../components/barang/FormTambah.vue";
import FormEdit from "../components/barang/FormEdit.vue";
import ConfirmHapus from "../components/barang/ConfirmHapus.vue";
import FormSetJumlah from '../components/barang/FormSetJumlah.vue';

export default {
  name: "BarangPage",
  components: {
    FormEdit,
    FormTambah,
    ConfirmHapus,
    FormSetJumlah,
  },
  data() {
    return {
      page: 1,
      search: "",
      headers: [
        { text: "ID", value: "id"},
        { text: "Barcode", value: "barcode"},
        { text: "Nama", value: "nama"},
        { text: "Harga", value: "harga"},
        { text: "Jumlah", value: "jumlah" },
      ],
    };
  },
  computed: {
    barang() {
      return this.$store.state.barang
    },
    maxPages() {
      return this.$store.state.maxPages;
    },
  },
  methods: {
    async filterTable() {
      await this.$store.dispatch("GET_BARANG", {
        search: this.search,
        page: this.page,
      });
    },
  },
  mounted() {
    this.$store.dispatch("GET_BARANG", {
      search: this.search,
      page: this.page,
    });
  }
};
</script>