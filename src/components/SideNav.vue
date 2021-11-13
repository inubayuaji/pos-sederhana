<template>
  <v-navigation-drawer
    permanent
    expand-on-hover
    app
    style="background: rgb(61 61 70)"
  >
    <v-list nav dense>
      <v-list-item link :to="{ name: 'Kasir' }">
        <v-list-item-icon>
          <v-icon>mdi-cash-register</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Kasir</v-list-item-title>
      </v-list-item>
      <v-list-item link :to="{ name: 'Barang' }">
        <v-list-item-icon>
          <v-icon>mdi-package-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Barang</v-list-item-title>
      </v-list-item>
      <v-list-item link :to="{ name: 'Jasa' }">
        <v-list-item-icon>
          <v-icon>mdi-printer</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Jasa</v-list-item-title>
      </v-list-item>
      <v-list-item link :to="{ name: 'Akuntansi' }">
        <v-list-item-icon>
          <v-icon>mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Akuntansi</v-list-item-title>
      </v-list-item>
      <v-list-item link :to="{ name: 'Admin' }">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Admin</v-list-item-title>
      </v-list-item>
      <v-list-item link :to="{ name: 'Logout' }">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append v-if="isStokHabis">
      <v-list>
        <v-list-item class="tertiary" @click="openStokHabis()">
          <v-list-item-icon>
            <v-icon>mdi-alert</v-icon>
          </v-list-item-icon>
          <v-list-item-title>Stok Habis</v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "SideNav",
  computed: {
    isStokHabis() {
      return this.$store.state.isStokHabis;
    }
  },
  methods: {
    openStokHabis() {
      alert('Halo');
    }
  },
  mounted() {
    this.$store.dispatch("CHECK_STOK_BARANG");
  }
};
</script>