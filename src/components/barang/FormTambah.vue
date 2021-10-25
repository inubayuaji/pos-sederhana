<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary"> Tambah </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5"> Tambah Barang </v-card-title>

        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="form.id"
              :rules="[rules.required]"
              dense
              required
              label="ID"
            ></v-text-field>
            <v-text-field
              v-model="form.barcode"
              :rules="[rules.required]"
              dense
              required
              label="Barcode"
            ></v-text-field>
            <v-text-field
              v-model="form.nama"
              :rules="[rules.required]"
              dense
              required
              label="Nama"
            ></v-text-field>
            <v-text-field
              type="number"
              v-model="form.harga"
              :rules="[rules.required]"
              dense
              required
              label="Harga"
            ></v-text-field>
            <v-text-field
              type="number"
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
          <v-btn color="primary" text @click="simpan()">Tambah</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "FormTambahBarang",
  data() {
    return {
      dialog: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      form: {
        id: "",
        barcode: "",
        nama: "",
        harga: 0,
        jumlah: 0,
      },
    };
  },
  methods: {
    async simpan() {
      var isValid = this.$refs.form.validate();

      if (isValid) {
        this.$store.dispatch("SAVE_BARANG", { barang: this.form });
        this.dialog = false;
      }
    },
  },
};
</script>