<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon color="senary">
          <v-icon>mdi-alarm-panel-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5"> Set Jumlah Barang </v-card-title>

        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="form.jumlah"
              dense
              label="Jumlah"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Batal</v-btn>
          <v-btn color="quaternary" text @click="simpan">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "FormSetJumlah",
  props: ["barang-id", "jumlah"],
  data() {
    return {
      dialog: false,
      form: {
        jumlah: 0,
      },
    };
  },
  methods: {
    async simpan() {
      var isValid = this.$refs.form.validate();

      if (isValid) {
        this.$store.dispatch("SET_JUMLAH_BARANG", {
          id: this.barangId,
          jumlah: this.form.jumlah,
        });
        this.$store.dispatch("CHECK_STOK_BARANG");
        this.$store.dispatch("GET_HABIS_BARANG", {
          search: "",
          page: 1,
        });
        this.dialog = false;
      }
    },
  },
  mounted() {
    this.form.jumlah = this.jumlah;
  },
};
</script>