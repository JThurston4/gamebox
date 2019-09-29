import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import TicTacToe from './views/TicTacToe.vue'
import Login from './views/Login.vue'

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
    }

  ]
})
