<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" icon color="quaternary">
          <v-icon>mdi-note-edit-outline</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5"> Edit Admin </v-card-title>

        <v-card-text>
          <v-form ref="form" lazy-validation>
            <v-text-field
              v-model="form.nama"
              :rules="[rules.required]"
              dense
              label="Nama"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.username"
              :rules="[rules.required]"
              dense
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="form.password"
              :rules="[rules.required]"
              dense
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">Batal</v-btn>
          <v-btn color="quaternary" text @click="simpan()">Simpan</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "FormEditAdmin",
  props: ["username", "admin"],
  data() {
    return {
      dialog: false,
      rules: {
        required: (value) => !!value || "Required.",
      },
      form: {
        nama: "",
        username: "",
        password: "",
      },
    };
  },
  methods: {
    async simpan() {
      var isValid = this.$refs.form.validate();

      if (isValid) {
        this.$store.dispatch("UPDATE_ADMIN", {
          username: this.username,
          admin: this.form,
        });
        this.dialog = false;
      }
    },
  },
  mounted() {
    this.form = this.admin;
  }
};
</script>