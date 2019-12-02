import Vue from 'vue'
import Vuex from 'vuex'
import Player from '../models/player'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    players: [],
    round: 1,
    gameSettings: {
      loseScore: 134
    },
    gameEnded: false,
    availableIcons: [...Player.ICON_CHOICES]
  },
  mutations: {
    addPlayer (state, payload) {
      state.players.push(payload)
    },
    updatePlayer (state, payload) {
      state.players[payload.index] = payload.data
    },
    deletePlayer (state, payload) {
      state.players.splice(payload.index, 1)
    },
    incrementRound (state) {
      state.round++
    },
    setGameEnded (state, payload) {
      state.gameEnded = payload
    },
    resetGame (state) {
      state.gameEnded = false
      state.round = 1
    },
    setAvailableIcons (state, payload) {
      state.availableIcons = payload
    }
  },
  actions: {
    newGame (context) {
      context.commit('resetGame')
      context.state.players.forEach(p => p.resetScore())
    },
    finishRound (context) {
      context.commit('incrementRound')
      context.state.players.forEach(player => {
        const playerScore = player.updateScore()
        if (playerScore >= context.state.gameSettings.loseScore) {
          // Game ended
          context.commit('setGameEnded', true)
        }
      })
    },
    getWinningPlayer (context) {
      return new Promise(resolve => {
        let lowestScorePlayer = context.state.players[0]
        context.state.players.forEach(player => {
          if (player.totalScore <= lowestScorePlayer.totalScore) lowestScorePlayer = player
        })
        resolve(lowestScorePlayer)
      })
    },
    createPlayer (context, data) {
      return new Promise(resolve => {
        Player.createPlayer(data.name, data.icon)
          .then(newPlayer => {
            context.commit('addPlayer', newPlayer)
            resolve(newPlayer)
          })
      })
    },
    updatePlayer (context, data) {
      return new Promise((resolve, reject) => {
        const playerIndex = context.state.players.indexOf(data.player)
        const updatedPlayer = Object.assign(data.player, data.data)
        if (playerIndex > -1) {
          context.commit('updatePlayer', {
            index: playerIndex,
            data: updatedPlayer
          })
          resolve(updatedPlayer)
        } else {
          reject(new ReferenceError('PLAYER_NOT_FOUND'))
        }
      })
    },
    deletePlayer (context, data) {
      return new Promise((resolve, reject) => {
        const playerIndex = context.state.players.indexOf(data)
        if (playerIndex > -1) {
          context.commit('deletePlayer', {
            index: playerIndex
          })
          resolve()
        } else {
          reject(new ReferenceError('PLAYER_NOT_FOUND'))
        }
      })
    },
    savePlayers (context) {
      localStorage.setItem('frantic-player-data', JSON.stringify(context.state.players))
    },
    loadPlayers (context, force) {
      if (!context.state.players.length || force) {
        const players = JSON.parse(localStorage.getItem('frantic-player-data'))
        if (players) {
          players.forEach(p => context.commit('addPlayer', Player.parsePlayer(p)))
        }
      }
    },
    getPlayerIcon (context) {
      return new Promise(resolve => {
        const availableIcons = context.state.availableIcons
        const icon = availableIcons.pop()
        if (icon) {
          context.commit('setAvailableIcons', availableIcons)
          resolve(icon)
        } else {
          context.commit('setAvailableIcons', Player.ICON_CHOICES)
          context.dispatch('getPlayerIcon')
            .then(icon => resolve(icon))
        }
      })
    }
  },
  modules: {
  }
})
