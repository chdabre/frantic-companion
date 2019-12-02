<template>
  <v-simple-table
    class="scoreboard"
    fixed-header
    height="60vh"
  >
    <template v-slot:default>
      <thead>
        <tr>
          <th
            v-for="player in players" :key="`player-${player.id}`"
            class="text-center"
          >
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon v-on="on">{{ player.icon }}</v-icon>
              </template>
              <span>{{ player.name }}</span>
            </v-tooltip>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="roundNumber in round" :key="`round-${roundNumber}}`">
          <td
            v-for="player in players"
            :key="`score-${roundNumber}-${player.id}`"
            class="text-center"
            v-text="player.getScore(roundNumber - 1)"
          ></td>
        </tr>
      </tbody>
      <tfoot class="table-footer">
        <tr>
          <td
            v-for="player in players"
            :key="`total-score-${player.id}`"
            class="text-center font-weight-bold"
            v-text="player.totalScore"
          ></td>
        </tr>
      </tfoot>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: 'Scoreboard',
  props: {
    players: Array,
    round: Number
  }
}
</script>

<style lang="scss">
.scoreboard {
  //height: 50vh;
}
</style>
