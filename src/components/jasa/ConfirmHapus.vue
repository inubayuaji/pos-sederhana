<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon color="red">
          <v-icon>mdi-delete-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5"> Hapus Jasa </v-card-title>

        <v-card-text> Lanjut untuk menghapus? </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Batal</v-btn>
          <v-btn color="red" text @click="hapus()">Hapus</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ConfirmHapusBarang",
  props: ["jasa-id"],
  data() {
    return {
      dialog: false,
    };
  },
  methods: {
    async hapus() {
      this.$store.dispatch("DELETE_JASA", { id: this.jasaId });
      this.dialog = false;
    },
  },
};
</script>