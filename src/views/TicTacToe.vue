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
    <div class="container tboard">
      <div v-for="(board, i) in getGame.board" :class="['row', 'sect-' + i]">
        <div v-for="(element, j) in board" :class="['col-4', 'sect-' + i + '-' + j]" v-on:click="updateBoard(i, j)">
          {{getGame.board[i][j]}} 
          <span v-if="getGame.board[i][j] == ' ' && getGame.active" :class="['hov']">
            {{getGame.playerOneTurn === true ? 'X' : 'O'}}
          </span>
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
        return this.$store.state.tttGame;
      },
    },
    methods: {
      updateBoard(mIndex, aIndex) {
        if (this.getGame.active) {
          let board = this.getGame.board
          if (board[mIndex][aIndex] != " ") {
            this.invalid = true
          } else {
            this.invalid = false
            board[mIndex].splice(aIndex, 1, this.getGame.playerOneTurn === true ? "X" : "O")
            this.getGame.board = board;
            this.getGame.playerOneTurn = !this.getGame.playerOneTurn;
            this.getGame.lastSaved = Date.now();
            this.$store.dispatch("updateTTTBoard", this.getGame)
          }
          
        }
      },
      newGame() {
        this.$store.dispatch("newGameTTT", { playerOneTurn: true })
      },
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
    color: green;
  }

  .tie-text{
    font-size: 40px;
    font-weight: bold;
    color: rgb(59, 59, 59)
  }

  .invalid{
    font-size: 25px;
    color:rgb(59, 59, 59);
  }

  .tboard {
    border: 2px solid;
    max-width: 500px;
  }
  
  .hov {
    display:none;
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
  
  /* squares */
  /* #region */
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
    display:i
  }
  /* #endregion */

  /* hover effect */
  /* #region */
  .sect-0-0:hover .hov{
    display:block;
    opacity: .5;
  }
  .sect-0-1:hover .hov{
    display:block;
    opacity: .5;
  }
  .sect-0-2:hover .hov{
    display:block;
    opacity: .5;
  }
  .sect-1-0:hover .hov{
    display:block;
    opacity: .5;
  }
  .sect-1-1:hover .hov{
    display:block;
    opacity: .5;
  }
  .sect-1-2:hover .hov{
    display:block;
    opacity: .5;
  }
  .sect-2-0:hover .hov{
    display:block;
    opacity: .5;
  }
  .sect-2-1:hover .hov{
    display:block;
    opacity: .5;
  }
  .sect-2-2:hover .hov{
    display:block;
    opacity: .5;
  }
  /* #endregion */
</style>