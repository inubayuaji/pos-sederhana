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
            <v-text-field
              label="Cari"
              v-model="search"
              @keyup="filterTable()"
            ></v-text-field>
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
          :items="admin"
          :items-per-page="5"
          item-key="username"
          class="elevation-1"
          :hide-default-footer="true"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.nama }}</td>
              <td>{{ row.item.username }}</td>
              <td class="d-flex justify-end">
                <confirm-hapus :username="row.item.username"></confirm-hapus>
                <form-edit
                  :username="row.item.username"
                  :admin="row.item"
                ></form-edit>
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
      page: 1,
      search: "",
      headers: [
        {
          text: "Nama",
          align: "start",
          value: "nama",
        },
        { text: "Username", value: "username" },
      ],
    };
  },
  computed: {
    admin() {
      return this.$store.state.admin;
    },
    maxPages() {
      return this.$store.state.maxPages;
    },
  },
  methods: {
    async filterTable() {
      await this.$store.dispatch("GET_ADMIN", {
        search: this.search,
        page: this.page,
      });
    },
  },
  async mounted() {
    await this.$store.dispatch("GET_ADMIN", {
      search: this.search,
      page: this.page,
    });
  },
};
</script>