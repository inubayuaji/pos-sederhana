<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Jasa</h1>
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
          :items="jasa"
          :items-per-page="5"
          item-key="name"
          class="elevation-1"
          :hide-default-footer="true"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.id }}</td>
              <td>{{ row.item.nama }}</td>
              <td>Rp {{ row.item.harga }}</td>
              <td class="d-flex justify-end">
                <confirm-hapus :jasa-id="row.item.id"></confirm-hapus>
                <form-edit :jasa-id="row.item.id" :jasa="row.item"></form-edit>
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
import FormTambah from "../components/jasa/FormTambah.vue";
import FormEdit from "../components/jasa/FormEdit.vue";
import ConfirmHapus from "../components/jasa/ConfirmHapus.vue";

export default {
  name: "JasaPage",
  components: {
    FormEdit,
    FormTambah,
    ConfirmHapus,
  },
  data() {
    return {
      page: 1,
      search: "",
      headers: [
        { text: "ID", value: "id"},
        { text: "Nama", value: "nama"},
        { text: "Harga", value: "harga"},
      ],
    };
  },
  computed: {
    jasa() {
      return this.$store.state.jasa
    },
    maxPages() {
      return this.$store.state.maxPages;
    },
  },
  methods: {
    async filterTable() {
      await this.$store.dispatch("GET_JASA", {
        search: this.search,
        page: this.page,
      });
    },
  },
  mounted() {
    this.$store.dispatch("GET_JASA", {
      search: this.search,
      page: this.page,
    });
  }
};
</script>