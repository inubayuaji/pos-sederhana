<template>
  <v-navigation-drawer permanent expand-on-hover app>
    <v-list nav dense>
      <v-list-item link to="/">
        <v-list-item-icon>
          <v-icon>mdi-cash-register</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Kasir</v-list-item-title>
      </v-list-item>
      <v-list-item link href="/barang">
        <v-list-item-icon>
          <v-icon>mdi-package-variant</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Barang</v-list-item-title>
      </v-list-item>
      <v-list-item link href="/admin">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Admin</v-list-item-title>
      </v-list-item>
      <v-list-item link href="/logout">
        <v-list-item-icon>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-icon>
        <v-list-item-title>Logout</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'SideNav'
}
</script>