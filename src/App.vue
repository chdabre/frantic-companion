<template>
  <v-app>
    <v-content>
      <v-app-bar
        v-if="!hideAppBar"
        color="background"
      >
        <v-btn
          icon
          v-if="!appBarSettings.hideBackButton"
          @click="$router.back()"
        >
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-toolbar-title class="subtitle-1">{{ appBarSettings.title }}</v-toolbar-title>
      </v-app-bar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    hideAppBar () {
      return this.$route.meta.hideAppBar
    },
    appBarSettings () {
      return Object.assign({
        title: 'Frantic',
        hideBackButton: false
      }, this.$route.meta.appBarSettings || {})
    }
  }
}
</script>

<style lang="scss">
html {
  -webkit-text-size-adjust: none
}
body {
  position: fixed;
  width: 100%;
}
.theme--dark.v-application {
  background-color: #161616!important; // Override dark bg color
}
</style>
