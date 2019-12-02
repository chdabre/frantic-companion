<template>
  <v-container class="home">
    <v-col>
      <v-row class="mt-5" justify="center">
        <v-img
          max-width="300px"
          :src="require('../assets/frantic_logo.svg')"
        ></v-img>
      </v-row>
      <v-row class="mt-10" justify="center">
        <span class="title text-uppercase">Spielbegleiter</span>
      </v-row>
      <v-row class="mt-10">
        <v-btn
          block light
          color="white"
          class="mb-5"
          :to="{ name: 'setup-game' }"
        >Neues Spiel
        </v-btn>
<!--        <v-btn-->
<!--          block light-->
<!--          color="white"-->
<!--          class="mb-5"-->
<!--        >Punkterechner-->
<!--        </v-btn>-->
      </v-row>
    </v-col>
  </v-container>
</template>

<script>
export default {
  name: 'Home'
}
</script>
