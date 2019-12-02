<template>
  <v-dialog
    ref="dialog"
    persistent
    width="290px"
    @update:return-value="$emit('input', $event)"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>{{ icon }}</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title>Icon auswählen</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col
            v-for="icon in iconChoices"
            :key="icon"
            cols="2"
          >
            <v-btn icon small @click="$refs.dialog.save(icon)">
              <v-icon>{{ icon }}</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  name: 'SetupGamePlayerCardIconDialog',
  props: {
    icon: String
  },
  data () {
    return {
      iconChoices: []
    }
  },
  created () {
    import('../models/player')
      .then(player => {
        this.iconChoices = player.default.ICON_CHOICES
      })
  }
}
</script>
