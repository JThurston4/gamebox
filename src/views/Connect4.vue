<template>
  <div class="container-fluid">
    <div class="row">
      <div :class="['col-12', 'winner-text']" v-if="!!getGame.winningPlayer">
        {{getGame.winningPlayer}} wins!
      </div>
      <div :class="['col-12', 'tie-text']" v-if="getGame.tie">
        Tie game, impressive!
      </div>
      <div :class="['col-12', 'invalid']" v-if="invalid">
        Invalid move, please try again
      </div>
      <div :class="'col-12'">
        <button v-on:click="newGame()">New Game</button>
      </div>
    </div>
    <div class="container table">
      <div v-for="(row, i) in getGame.board" >
        <div v-for="(element, j) in row" v-on:click="updateBoard(j)">
          <div class="square">
            <div :class="[getGame.board[i][j] == ' ' ? 'circle' : 'circle-' + getGame.board[i][j]]"></div>
          </div>
          <!-- <span v-if="getGame.board[i][j] == ' ' && getGame.active"
            :class="['hov']">{{getGame.playerOneTurn === true ? 'X' : 'O'}}</span> -->
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
      },

      updateBoard(index) {
        if (this.getGame.active) {
          let board = this.getGame.board
          if (board[0][index] != " ") {
            this.invalid = true
          } else {
            this.invalid = false
            board[0].splice(index, 1, this.getGame.playerOneTurn === true ? 1 : 2)
            this.getGame.board = board;
            this.getGame.playerOneTurn = !this.getGame.playerOneTurn;
            this.getGame.lastSaved = Date.now();
            this.$store.dispatch("updateC4Game", this.getGame)
          }
        }
      }
    },
    components: {},
    props: [],
  }

</script>

<style>

  .table {
  height: 480px;
  width: 590px;
}

  .circle {
  height: 55px;
  width: 55px;
  background: blue;

  border-radius: 50%;
}

.circle-1 {
  height: 55px;
  width: 55px;
  background: red;

  border-radius: 50%;
}

.circle-2 {
  height: 55px;
  width: 55px;
  background: yellow;

  border-radius: 50%;
}

.square {
  height: 80px;
  width: 80px;
  background: rgb(121, 121, 251);
  float: left;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 1px, solid, black;
}
</style>
