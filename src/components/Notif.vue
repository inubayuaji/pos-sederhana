<template>
  <v-snackbar v-model="show" :timeout="1500" :top="true">
    {{ message }}

    <template v-slot:action="{ attrs }">
      <v-btn color="tertiary" text v-bind="attrs" @click="close()"> Tutup </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Notif",
  computed: {
    show: {
      get() {
        return this.$store.state.notif.show;
      },
      set() {
        this.$store.commit("CLOSE_NOTIF");
      }
    },
    message() {
      return this.$store.state.notif.message;
    },
  },
  methods: {
    close() {
      this.$store.commit("CLOSE_NOTIF");
    },
  },
};
</script>