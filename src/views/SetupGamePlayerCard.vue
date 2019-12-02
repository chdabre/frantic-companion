<template>
  <v-card
    class="mb-2"
    :color="create ? '#202020' : ''"
  >
    <v-card-text>
      <v-row no-gutters class="align-center">
        <SetupGamePlayerCardIconDialog :icon="create ? icon : player.icon" @input="updateIcon"/>
        <v-text-field
          solo
          flat
          hide-details
          color="white"
          :clearable="create"
          :disabled="!create"
          :background-color="create ? '#202020' : ''"
          v-model="name"
          placeholder="Spieler"
          @keydown.enter="createPlayer"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon v-if="create" @click="createPlayer">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn icon v-else @click="deletePlayer">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
import SetupGamePlayerCardIconDialog from './SetupGamePlayerCardIconDialog'

export default {
  name: 'SetupGamePlayerCard',
  components: { SetupGamePlayerCardIconDialog },
  props: {
    create: Boolean,
    player: Object
  },
  data () {
    return {
      name: '',
      icon: '',
      submitIcon: false
    }
  },
  created () {
    if (this.create) {
      this.resetForm()
    } else {
      // Populate player data
      this.name = this.player.name
    }
  },
  methods: {
    createPlayer () {
      this.$store.dispatch('createPlayer', {
        name: this.name,
        icon: this.submitIcon ? this.icon : null
      }).then(() => this.resetForm())
    },
    deletePlayer () {
      this.$store.dispatch('deletePlayer', this.player)
    },
    updateIcon (icon) {
      if (this.create) {
        this.submitIcon = true
        this.icon = icon
      } else {
        this.$store.dispatch('updatePlayer', {
          player: this.player,
          data: {
            icon
          }
        })
      }
    },
    resetForm () {
      this.name = ''
      this.icon = 'mdi-dice-6'
      this.submitIcon = false
    }
  }
}
</script>

<style lang="scss">
.v-input--is-disabled input {
  color: white!important;
}
</style>
