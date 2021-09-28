<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" color="primary"> Tambah </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5"> Tambah Barang </v-card-title>

        <v-card-text>
          <v-text-field dense label="Halo"></v-text-field>
          <v-text-field dense label="Bar Code"></v-text-field>
          <v-text-field dense label="Nama"></v-text-field>
          <v-text-field dense label="Jumlah"></v-text-field>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Batal</v-btn>
          <v-btn color="primary" text @click="dialog = false">Tambah</v-btn>
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
    };
  },
};
</script>