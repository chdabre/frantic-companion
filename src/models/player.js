import store from '../store/index.js'
import uuid4 from 'uuid/v4'

export default class Player {
  constructor (name, icon, id) {
    this.name = name
    this.icon = icon
    this.id = id
    this.rounds = []
  }

  setNextScore (score) {
    this._nextScore = score
  }

  updateScore () {
    this.rounds.push(this._nextScore)
    this._nextScore = 0
    return this.totalScore
  }

  getScore (round) {
    return this.rounds[round]
  }

  resetScore () {
    this.rounds = []
  }

  get totalScore () {
    if (this.rounds.length) {
      return this.rounds.reduce((a, b) => a + b)
    } else {
      return 0
    }
  }

  static async createPlayer (name, icon) {
    if (!icon) icon = await store.dispatch('getPlayerIcon')
    return new Player(name, icon, uuid4())
  }

  static parsePlayer (playerObject) {
    return new Player(
      playerObject.name,
      playerObject.icon,
      playerObject.id
    )
  }

  static get ICON_CHOICES () {
    return [
      'mdi-dice-6',
      'mdi-circle',
      'mdi-gamepad'
    ]
  }
}
