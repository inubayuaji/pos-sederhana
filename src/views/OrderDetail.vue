<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Order Detail</h1>
      </v-col>
    </v-row>

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
            
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="orderDetail"
          :items-per-page="5"
          item-key="name"
          class="elevation-1"
          :hide-default-footer="true"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.nama_item }}</td>
              <td>Rp {{ row.item.type }}</td>
              <td>Rp {{ row.item.jumlah }}</td>
              <td>Rp {{ row.item.harga_jual }}</td>
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
export default {
  name: "OrderDetailPage",
  data() {
    return {
      page: 1,
      search: "",
      headers: [
        { text: "Nama", value: "nama_item" },
        { text: "Type", value: "type" },
        { text: "Jumlah", value: "jumlah" },
        { text: "Harga", value: "harga_jual" },
      ],
    };
  },
  computed: {
    orderDetail() {
      return this.$store.state.orderDetail;
    },
    maxPages() {
      return this.$store.state.maxPages;
    },
  },
  methods: {
    async filterTable() {
      var _this = this;

      await this.$store.dispatch("GET_DETAIL_ORDER", {
        filter: {
          search: this.search,
          page: this.page,
        },
        id: _this.$route.params.id,
      });
    },
  },
  mounted() {
    var _this = this;

    this.$store.dispatch("GET_DETAIL_ORDER", {
      filter: {
        search: this.search,
        page: this.page,
      },
      id: _this.$route.params.id,
    });
  },
};
</script>