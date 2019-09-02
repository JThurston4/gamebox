<template>
  <div class="container-fluid ttt">
    <div class="row">
      <div :class="[getGameStatus.active ? 'col-6' : 'col-4']"><button v-on:click="counter += 1, status()">get
          status</button></div>
      <div :class="[getGameStatus.active ? '' : 'col-4', 'winner-text']" v-if="getGameStatus.active === false">
        {{getGameStatus.winningPlayer}} wins!</div>
      <div :class="getGameStatus.active ? 'col-6' : 'col-4'"><button v-on:click="resetBoard()">New Game</button></div>
    </div>
    <div class="container tboard">
      <div v-for="(board, i) in getBoard" :class="['row', 'sect-' + i]">
        <div v-for="(element, j) in board" :class="['col-4', 'sect-' + i + '-' + j]" v-on:click="updateBoard(i, j)">
          {{getBoard[i][j]}}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        counter: 0,
        playerOne: true
      }
    },
    computed: {
      getBoard() {
        return this.$store.state.tttBoard;
      },
      getGameStatus() {
        return this.$store.state.winner;
      }
    },
    methods: {
      updateBoard(mIndex, aIndex) {
        if (this.getGameStatus.active) {
          let board = this.getBoard
          if (board[mIndex][aIndex] === " ") {
            board[mIndex].splice(aIndex, 1, this.playerOne === true ? "X" : "O")
            this.playerOne = !this.playerOne
          }
          this.$store.dispatch("updateBoard", board)
        }
      },
      resetBoard() {
        this.playerOne = true
        this.$store.dispatch("reset", { board: [[" ", " ", " "], [" ", " ", " "], [" ", " ", " "]], active: true })
      },
      status() {
        console.log(this.getGameStatus)
        console.log(this.getBoard)
      }
    },
    components: {},
    props: [],
  }

</script>

<style scoped>
  .winner-text {
    font-size: 40px;
    font-weight:bold;
    color: gold;
  }

  .tboard {
    /* border: 2px solid; */
    max-width: 500px;
  }

  .sect-0 {
    height: 10rem;
  }

  .sect-1 {
    height: 10rem;
  }

  .sect-2 {
    height: 10rem;
  }

  .sect-0-0 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    border-width: 0px 3px 3px 0px;
    border-style: solid;
    border-color: black;

  }

  .sect-0-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    border-width: 0px 3px 3px 3px;
    border-style: solid;
    border-color: black;
  }

  .sect-0-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    border-width: 0px 0px 3px 3px;
    border-style: solid;
    border-color: black;
  }

  .sect-1-0 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    border-width: 3px 3px 3px 0px;
    border-style: solid;
    border-color: black;
  }

  .sect-1-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    border-width: 3px 3px 3px 3px;
    border-style: solid;
    border-color: black;
  }

  .sect-1-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    border-width: 3px 0px 3px 3px;
    border-style: solid;
    border-color: black;
  }

  .sect-2-0 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    border-width: 3px 3px 0px 0px;
    border-style: solid;
    border-color: black;
  }

  .sect-2-1 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    border-width: 3px 3px 0px 3px;
    border-style: solid;
    border-color: black;
  }

  .sect-2-2 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 6rem;
    border-width: 3px 0px 0px 3px;
    border-style: solid;
    border-color: black;
  }
</style>