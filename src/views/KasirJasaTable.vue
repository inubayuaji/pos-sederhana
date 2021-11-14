<template>
  <div>
    <v-row align="center">
      <v-col cols="8">
        <v-row>
          <v-col cols="4">
            <v-text-field
              label="Cari"
              v-model="search"
              @keyup="filterTable"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="4">
        <v-row justify="end">
          <v-col cols="12" class="justify-end d-flex">
            <v-btn class="mr-2" color="primary" @click="openBarang()">Barang</v-btn>
            <v-btn color="quinary">Jasa</v-btn>
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
              <td class="justify-end d-flex">
                <v-btn icon color="primary" @click="addOrder(row.item)">
                  <v-icon>mdi-plus</v-icon>
                </v-btn>
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
  </div>
</template>

<script>
export default {
  name: "KasirJasaTable",
  data() {
    return {
      page: 1,
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Nama", value: "nama" },
        { text: "Harga", value: "harga" },
      ],
    };
  },
  computed: {
    jasa() {
      return this.$store.state.jasa;
    },
    maxPages() {
      return this.$store.state.maxPages;
    },
  },
  methods: {
    openBarang() {
      this.$router.push({ name: "Kasir.Barang" });
    },
    addOrder(jasa) {
      this.$store.commit("ADD_ORDER", {
        order: {
          itemId: jasa.id,
          type: 'jasa',
          nama: jasa.nama,
          harga: jasa.harga,
          jumlah: 1,
        },
      });
    },
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
  },
};
</script>