<template>
  <div class="container-fluid">
    <div class="row">
      <div :class="[getGame.active ? 'col-6' : 'col-4']">
        <button v-on:click="counter += 1, status()">get status</button>
      </div>
      <div :class="[getGame.active ? '' : 'col-4', 'winner-text']" v-if="getGame.active === false">
        {{getGame.winningPlayer}} wins!
      </div>
      <div :class="getGame.active ? 'col-6' : 'col-4'">
        <button v-on:click="newGame()">New Game</button>
      </div>
    </div>
    <div class="container tboard">
      <div v-for="(board, i) in getGame.board" :class="['row', 'sect-' + i]">
        <div v-for="(element, j) in board" :class="['col-4', 'sect-' + i + '-' + j]" v-on:click="updateBoard(i, j)">
          {{getGame.board[i][j]}}
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
        counter: 0,
        playerOne: true
      }
    },
    computed: {
      getGame() {
        console.log(this.$store.state.tttGame)
        return this.$store.state.tttGame;
      },
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
      newGame() {
        this.playerOne = true
        this.$store.dispatch("newGameTTT", { playerOneTurn: true })
      },
      status() {
        console.log(this.getBoard)
      }
    },
    components: {},
    props: [],
    mounted: function() {
      this.$store.dispatch('newGameTTT', {playerOneTurn: true})
    }
    
  }

</script>

<style scoped>
  .winner-text {
    font-size: 40px;
    font-weight: bold;
    color: gold;
  }

  .tboard {
    border: 2px solid;
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