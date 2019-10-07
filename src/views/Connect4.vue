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
    <div class="container table2">
      <!-- <div v-for="(ele, k) in getGame.board[0]" v-if="getGame.board">
        <div :class="['square2']">
          <div :class="[playerOneTurn ? 'circle-1-' + k : 'circle-2-' + k]"></div>
        </div>
      </div> -->
      <div class="yourBoat">
        <div :class="['square2']">
          <div :class="[getGame.playerOneTurn ? 'zero-1' : 'zero-2']"></div>
        </div>
        <div class="square2 one">
          <div :class="[getGame.playerOneTurn ? 'one-1' : 'one-2']"></div>
        </div>
        <div class="square2 two">
          <div :class="[getGame.playerOneTurn ? 'two-1' : 'two-2']"></div>
        </div>
        <div class="square2 three">
          <div :class="[getGame.playerOneTurn ? 'three-1' : 'three-2']"></div>
        </div>
        <div class="square2 four">
          <div :class="[getGame.playerOneTurn ? 'four-1' : 'four-2']"></div>
        </div>
        <div class="square2 five">
          <div :class="[getGame.playerOneTurn ? 'five-1' : 'five-2']"></div>
        </div>
        <div class="square2 six">
          <div :class="[getGame.playerOneTurn ? 'six-1' : 'six-2']"></div>
        </div>
      </div>
      <div class="container table">
        <div v-for="(row, i) in getGame.board">
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
        this.$store.dispatch('newGameC4', { playerOneTurn: true })
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
    height: 300px;
    width: 350px;
    padding: 0px;
  }

  .table2 {
    height: 50px;
    width: 350px;
    padding: 0px;
  }

  .circle {
    height: 35px;
    width: 35px;
    background: blue;

    border-radius: 50%;
  }

  .circle-1 {
    height: 35px;
    width: 35px;
    background: red;

    border-radius: 50%;
  }

  .circle-2 {
    height: 35px;
    width: 35px;
    background: yellow;

    border-radius: 50%;
  }

  .square {
    height: 50px;
    width: 50px;
    background: rgb(121, 121, 251);
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px, solid, black;
  }

  .square2 {
    height: 50px;
    width: 50px;
    background: rgb(121, 121, 251);
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: 1px, solid, black;
  }


  @media (min-width: 768px) {
    .table {
      height: 480px;
      width: 560px;
    }

    .table2 {
      height: 80px;
      width: 560px;
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
    .square2 {
      height: 80px;
      width: 80px;
      background: rgb(121, 121, 251);
      float: left;
      display: flex;
      justify-content: center;
      align-items: center;
      outline: 1px, solid, black;
    }
    
  }
</style>