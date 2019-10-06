<template>
  <div class="container-fluid">
    <div class="row">
      <div :class="['col-12', 'winner-text']" v-if="!!getGame.winningPlayer">
        {{getGame.winningPlayer}} wins!
      </div>
      <div :class="['col-12', 'tie-text']" v-if="getGame.tie">
        Cats game!
      </div>
      <div :class="['col-12', 'invalid']" v-if="invalid">
        Invalid move, please try again
      </div>
      <div :class="'col-12'">
        <button v-on:click="newGame()">New Game</button>
      </div>
    </div>
    <div class="container">
      <div v-for="(row, i) in getGame.board" :class="['row', 'sect-' + i]">
        <div v-for="(element, j) in row" :class="['col', 'sect-' + i + '-' + j]" v-on:click="updateBoard(i, j)">
          {{getGame.board[i][j]}} <span v-if="getGame.board[i][j] == ' ' && getGame.active"
            :class="['hov']">{{getGame.playerOneTurn === true ? 'X' : 'O'}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        invalid: false
      }
    },
    computed: {
      getGame() {
        return this.$store.state.c4Game
      }
    },
    methods: {
      newGame() {
        this.$store.dispatch('newGameC4', {playerOneTurn: true})
      }
    },
    components: {},
    props: [],
  }

</script>

<style>


</style>
