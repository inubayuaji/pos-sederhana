<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon color="orange">
          <v-icon>mdi-note-edit-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5"> Edit Barang </v-card-title>

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
              v-model="form.harga_umum"
              :rules="[rules.required]"
              dense
              required
              label="Harga Umum"
            ></v-text-field>
            <v-text-field
              type="number"
              v-model="form.harga_reseler"
              :rules="[rules.required]"
              dense
              required
              label="Harga Reseler"
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Batal</v-btn>
          <v-btn color="orange" text @click="simpan">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "FormEditBarang",
  props: ["barang-id", "barang"],
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
        harga_umum: 0,
        harga_reseler: 0,
      },
    };
  },
  methods: {
    async simpan() {
      var isValid = this.$refs.form.validate();

      if (isValid) {
        this.$store.dispatch("UPDATE_BARANG", {
          id: this.barangId,
          barang: this.form,
        });
        this.dialog = false;
      }
    },
  },
  mounted() {
    this.form = this.barang;
  }
};
</script>