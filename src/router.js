import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TicTacToe from './views/TicTacToe.vue'
import Login from './views/Login.vue'
import Connect4 from './views/Connect4.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/games/tictactoe',
      name: 'ttt',
      component: TicTacToe
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/games/connect4',
      name: 'c4',
      component: Connect4
    }

  ]
})
