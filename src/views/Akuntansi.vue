<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Akuntansi</h1>
      </v-col>
    </v-row>

    <v-row align="center">
      <v-col cols="3">
        <v-row>
          <v-col cols="12">
            <v-text-field
              label="Cari"
              v-model="search"
              @keyup="filterTable"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="9">
        <v-row justify="end">
          <v-col cols="12" class="d-flex justify-end">
            <akuntansi-filter
              @update="updateFilter"
              @save="exportExcel"
            ></akuntansi-filter>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="headers"
          :items="order"
          :items-per-page="5"
          item-key="name"
          class="elevation-1"
          :hide-default-footer="true"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.id }}</td>
              <td>{{ row.item.tanggal }}</td>
              <td>Rp {{ row.item.total }}</td>
              <td class="d-flex justify-end">
                <v-btn
                  link
                  color="quinary"
                  icon
                  :to="{ name: 'AkuntansiDetail', params: { id: row.item.id } }"
                >
                  <v-icon>mdi-folder-search</v-icon>
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

    <v-row class="mt-10 d-flex justify-center">
      <div class="total-untung">
        <div style="font-size: 13px">Untung</div>
        <div class="profit">
          Rp <span>{{ untungShow }}</span
          >,00
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import AkuntansiFilter from "../components/AkuntansiFilter.vue";
export default {
  components: { AkuntansiFilter },
  name: "AkuntansiPage",
  data() {
    return {
      page: 1,
      search: "",
      datePick: null,
      produkType: "Semua",
      headers: [
        { text: "ID", value: "id" },
        { text: "Tanggal", value: "tanggal" },
        { text: "Total", value: "total" },
      ],
    };
  },
  computed: {
    order() {
      return this.$store.state.order;
    },
    maxPages() {
      return this.$store.state.maxPages;
    },
    untung() {
      return this.$store.state.untung;
    },
    untungShow() {
      if (this.produkType == "Barang") {
        return this.untung.untung_barang;
      }
      if (this.produkType == "Jasa") {
        return this.untung.untung_jasa;
      }
      return this.untung.untung;
    },
  },
  methods: {
    async filterTable() {
      await this.$store.dispatch("GET_ORDER", {
        search: this.search,
        page: this.page,
        datePick: this.datePick,
      });

      await this.$store.dispatch("GET_PROFIT_ORDER", {
        search: this.search,
        page: this.page,
        datePick: this.datePick,
      });
    },
    async updateFilter(datePick, produkType) {
      this.datePick = datePick;
      this.produkType = produkType;

      await this.$store.dispatch("GET_ORDER", {
        search: this.search,
        page: this.page,
        datePick: this.datePick,
      });

      await this.$store.dispatch("GET_PROFIT_ORDER", {
        search: this.search,
        page: this.page,
        datePick: this.datePick,
      });
    },
    exportExcel(filePath) {
      this.$store.dispatch("EXPORT_ORDER", {
        filter: {
          search: this.search,
          datePick: this.datePick,
        },
        filePath: filePath,
      });
    },
  },
  mounted() {
    this.$store.dispatch("GET_ORDER", {
      search: this.search,
      page: this.page,
      datePick: this.datePick,
    });

    this.$store.dispatch("GET_PROFIT_ORDER", {
      search: this.search,
      page: this.page,
      datePick: this.datePick,
    });
  },
};
</script>

<style scoped>
.total-untung {
  padding: 5px;
  padding-left: 10px;
  border-left: 10px solid #1eb980;
}
.total-untung .profit {
  font-size: 30px;
}
</style>