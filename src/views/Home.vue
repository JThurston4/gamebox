<template>
  <div class="container-fluid ttt">
    <div class="row">
      <div class="col-6"><button v-on:click="counter += 1">Up</button>{{counter}}</div>
      <div class="col-6"><button v-on:click="counter -= 1">Down</button>{{counter}}</div>
    </div>
    <div v-for="(board, i) in getBoard" :class="['row', 'sect-' + i]">
      <div v-for="(element, j) in board" :class="['col-4', 'sect-' + i + '-' + j]" v-on:click="updateBoard(i, j)">{{getBoard[i][j]}}</div>
    </div>
    <!-- <div class="col-4 top-left" v-on:click="updateBoard(0,0)">{{getBoard[0][0]}}</div>
    <div class="col-4 top-center" v-on:click="updateBoard(0,1)">{{getBoard[0][1]}}</div>
    <div class="col-4 top-right" v-on:click="updateBoard(0,2)">{{getBoard[0][2]}}</div>
    <div class="col-4 mid-left" v-on:click="updateBoard(1,0)">{{getBoard[1][0]}}</div>
    <div class="col-4 mid-center" v-on:click="updateBoard(1,1)">{{getBoard[1][1]}}</div>
    <div class="col-4 mid-right" v-on:click="updateBoard(1,2)">{{getBoard[1][2]}}</div>
    <div class="col-4 bottom-left" v-on:click="updateBoard(2,0)">{{getBoard[2][0]}}</div>
    <div class="col-4 bottom-center" v-on:click="updateBoard(2,1)">{{getBoard[2][1]}}</div>
    <div class="col-4 bottom-right" v-on:click="updateBoard(2,2)">{{getBoard[2][2]}}</div> -->
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
      getTurn() {
        return this.$store.state.playerOneTurn;
      }
    },
    methods: {
      updateBoard(mIndex, aIndex) {
        let board = this.getBoard
        if (board[mIndex][aIndex] === " ") {
          board[mIndex].splice(aIndex, 1, this.playerOne === true ? "X" : "O")
          this.playerOne = !this.playerOne
        }
        console.log(board)
        // this.$store.dispatch("updateBoard", {board: board, player: this.playerOne === true ? "X" : "O"})
      }
    },
    components: {},
    props: [],
  }

</script>

<style>
  .sect-0 {
    height: 25vh;
    /* width: 20%; */
  }  
  .sect-1 {
    height: 25vh;
    /* width: 20%; */
  }  
  .sect-2 {
    height: 25vh;
    /* width: 20%; */
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