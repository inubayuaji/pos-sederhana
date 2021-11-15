<template>
  <div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" class="mr-2" dark v-bind="attrs" v-on="on">
          {{ dateType }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeDateType('Harian')">
          <v-list-item-title>Harian</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeDateType('Bulan')">
          <v-list-item-title>Bulan</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeDateType('Tahun')">
          <v-list-item-title>Tahun</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn class="mr-2" @click="isVisible = !isVisible">
      <template v-if="datePick != null">{{ datePick }}</template>
      <template v-else>Pilih</template>
    </v-btn>
    <div class="d-none">
      <vue-date-picker
        :visible="isVisible"
        :type="type"
        @onClose="isVisible = false"
        v-model="datePick"
        no-header
      ></vue-date-picker>
    </div>
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" class="mr-2" dark v-bind="attrs" v-on="on">
          {{ produkType }}
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeProdukType('Semua')">
          <v-list-item-title>Semua</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeProdukType('Barang')">
          <v-list-item-title>Barang</v-list-item-title>
        </v-list-item>
        <v-list-item @click="changeProdukType('Jasa')">
          <v-list-item-title>Jasa</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <v-btn color="primary" @click="openSaveDialog()">Export</v-btn>
  </div>
</template>

<script>
import { remote } from "electron";
import { VueDatePicker } from "@mathieustan/vue-datepicker";
import "@mathieustan/vue-datepicker/dist/vue-datepicker.min.css";

export default {
  name: "AkuntasiFilter",
  components: {
    VueDatePicker,
  },
  data() {
    return {
      type: "date",
      isVisible: false,
      dateType: "Harian",
      datePick: null,
      produkType: "Semua",
    };
  },
  watch: {
    datePick() {
      this.$emit("update", this.datePick, this.produkType);
    },
  },
  methods: {
    changeDateType(type) {
      this.dateType = type;

      if (type == "Harian") {
        this.type = "date";
      }
      if (type == "Bulan") {
        this.type = "month";
      }
      if (type == "Tahun") {
        this.type = "year";
      }

      this.$emit("update", this.datePick, this.produkType);
    },
    changeProdukType(type) {
      this.produkType = type;

      this.$emit("update", this.datePick, this.produkType);
    },
    async openSaveDialog() {
      var filePath = await remote.dialog.showSaveDialogSync({
        title: "Export order",
        filters: [{ name: "Excel", extensions: ["csv"] }],
      });
      this.$emit("save", filePath);
    },
  },
};
</script>