<template>
  <v-container class="d-flex flex-column">
    <h3 class="mb-5">Spieler hinzufügen</h3>

    <div class="players">
      <SetupGamePlayerCard v-for="player in players" :key="player.id" :player="player"/>
      <SetupGamePlayerCard
        create
        @create="players.push($event)"
      ></SetupGamePlayerCard>
    </div>

    <v-toolbar extended color="background" class="toolbar-bottom">
      <v-btn
        block
        light
        :disabled="!gameReady"
        :to="{ name: 'game' }"
      >
        Spiel Starten
      </v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import SetupGamePlayerCard from './SetupGamePlayerCard'

export default {
  name: 'SetupGame',
  components: { SetupGamePlayerCard },
  computed: {
    ...mapState(['players']),
    gameReady () {
      return this.players.length > 1
    }
  },
  created () {
    this.$store.dispatch('loadPlayers')
  }
}
</script>

<style lang="scss">
.players {
  overflow-y: scroll;
  max-height: calc(100vh - 220px);
  &::-webkit-scrollbar {
    display: none;
  }
}

.toolbar-bottom {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
}
</style>
