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
          <v-col cols="12" class="d-flex justify-end">
            <v-btn class="mr-2" color="primary">Barang</v-btn>
            <v-btn color="quinary" @click="openJasa()">Jasa</v-btn>
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
              <td>Rp {{ row.item.harga_umum }}</td>
              <td>Rp {{ row.item.harga_reseler }}</td>
              <td>{{ row.item.jumlah }}</td>
              <td class="d-flex justify-end">
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
  name: "KasirBarangTable",
  data() {
    return {
      page: 1,
      search: "",
      headers: [
        { text: "ID", value: "id" },
        { text: "Barcode", value: "barcode" },
        { text: "Nama", value: "nama" },
        { text: "Harga Umum", value: "harga_umum" },
        { text: "Harga Reseler", value: "harga_reseler" },
        { text: "Jumlah", value: "jumlah" },
      ],
    };
  },
  computed: {
    barang() {
      return this.$store.state.barang;
    },
    maxPages() {
      return this.$store.state.maxPages;
    },
  },
  methods: {
    openJasa() {
      this.$router.push({ name: "Kasir.Jasa" });
    },
    addOrder(barang) {
      this.$store.commit("ADD_ORDER", {
        barang: {
          barangId: barang.id,
          barcode: barang.barcode,
          nama: barang.nama,
          harga_umum: barang.harga_umum,
          harga_reseler: barang.harga_reseler,
          jumlah: 1,
        },
      });
    },
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
  },
};
</script>