<template>
  <v-container>
    <h3 class="mb-5">Spielstand Runde {{ round }}</h3>

    <Scoreboard :players="players" :round="round"/>
    <v-alert v-if="winningPlayer" color="red" class="mt-2" >Das Spiel ist zu ende. {{ winningPlayer.name }} gewinnt!</v-alert>
    <v-toolbar extended color="background" class="toolbar-bottom">
      <NewRoundDialog v-if="!winningPlayer"/>
      <v-btn v-else block light @click="$store.dispatch('newGame')">Neues Spiel</v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
import Scoreboard from './Scoreboard'
import NewRoundDialog from './NewRoundDialog'

export default {
  name: 'Game',
  components: { NewRoundDialog, Scoreboard },
  data () {
    return {
      winningPlayer: null
    }
  },
  created () {
    // Invalid Precondition
    if (this.players.length < 2) {
      this.$router.replace({ name: 'setup-game' })
    } else {
      this.$store.dispatch('savePlayers')
    }
  },
  computed: {
    ...mapState(['players', 'round', 'gameEnded'])
  },
  watch: {
    gameEnded (value) {
      if (value) {
        this.$store.dispatch('getWinningPlayer')
          .then(winningPlayer => {
            this.winningPlayer = winningPlayer
          })
      }
    }
  }
}
</script>

<style lang="scss">
  .theme--dark.v-data-table {
  background: transparent !important;
  }
</style>
