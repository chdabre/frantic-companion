<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn
        block
        light
        v-on="on"
      >Neue Runde
      </v-btn>
    </template>

    <v-card>
      <v-card-title v-if="currentPlayer">
        <v-icon class="mr-2">{{ currentPlayer.icon }}</v-icon>
        Punktzahl von {{ currentPlayer.name }}
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="scoreInput"
          solo
          light
          class="mt-2"
        ></v-text-field>
        <v-row>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(1)">1</v-btn></v-col>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(2)">2</v-btn></v-col>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(3)">3</v-btn></v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(4)">4</v-btn></v-col>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(5)">5</v-btn></v-col>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(6)">6</v-btn></v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(7)">7</v-btn></v-col>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(8)">8</v-btn></v-col>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(9)">9</v-btn></v-col>
        </v-row>
        <v-row>
          <v-col cols="4" class="text-center"></v-col>
          <v-col cols="4" class="text-center"><v-btn text @click="enterNumber(0)">0</v-btn></v-col>
          <v-col cols="4" class="text-center"><v-btn text @click="backspace"><v-icon>mdi-backspace</v-icon></v-btn></v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          text
          @click="cancel"
        >Abbrechen</v-btn>
        <v-btn
          text
          @click="confirm"
        >OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'NewRoundDialog',
  data () {
    return {
      dialog: false,
      playerIndex: 0,
      scoreInput: 0
    }
  },
  computed: {
    ...mapState(['players']),
    currentPlayer () {
      return this.players[this.playerIndex]
    }
  },
  methods: {
    enterNumber (number) {
      this.scoreInput = parseInt(this.scoreInput.toString() + number)
    },
    backspace () {
      if (this.scoreInput.toString().length > 1) {
        this.scoreInput = parseInt(this.scoreInput.toString().slice(0, -1))
      } else {
        this.scoreInput = 0
      }
    },
    confirm () {
      if (this.playerIndex <= this.players.length - 1) {
        this.players[this.playerIndex].setNextScore(this.scoreInput)
        this.scoreInput = 0
        this.playerIndex++
      }
      if (this.playerIndex > this.players.length - 1) {
        this.$store.dispatch('finishRound')
        this.playerIndex = 0
        this.scoreInput = 0
        this.dialog = false
      }
    },
    cancel () {
      this.playerIndex = 0
      this.scoreInput = 0
      this.dialog = false
    }
  }
}
</script>
