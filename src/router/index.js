import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SetupGame from '../views/SetupGame'
import Game from '../views/Game'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      hideAppBar: true
    }
  },
  {
    path: '/setup-game',
    name: 'setup-game',
    component: SetupGame,
    meta: {
      appBarSettings: {
        title: 'Spielvorbereitung'
      }
    }
  },
  {
    path: '/game',
    name: 'game',
    component: Game,
    meta: {
      appBarSettings: {
        title: 'Punktebrett',
        hideBackButton: true
      }
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
