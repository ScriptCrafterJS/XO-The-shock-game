"use strict";

const gameBoard = document.querySelector(".board");
const boardCells = document.querySelectorAll(".board__cell");
const currentRound = document.querySelector(".rounds");
let XPlayerName = document.querySelector(".left__player-name");
let OPlayerName = document.querySelector(".right__player-name");
const XScore = document.querySelector(".left__player-score");
const OScore = document.querySelector(".right__player-score");
const XSide = document.querySelector(".left-player");
const OSide = document.querySelector(".right-player");

//default settings
let currentPlayer = "o";
let OScoreValue = 0;
let XScoreValue = 0;
let aiSymbol = "o";
let currentRoundValue = 1;

const userData = JSON.parse(localStorage.getItem("userData"));
const userFirst = userData.playerFirst;
XPlayerName.textContent = userData.username;
const userSymbol = userData.playerSymbol;
const numberOfRounds = Number(userData.numberOfRounds);

if (userFirst) {
  if (userSymbol === "o") {
    aiSymbol = "x";
  } else {
    currentPlayer = "x";
  }
  makePlayerActive(currentPlayer);
} else {
  if (userSymbol === "o") {
    aiSymbol = "x";
    currentPlayer = "x";
  }
  makePlayerActive(currentPlayer);
  makeMinimaxMove();
}

function makePlayerActive(symbol) {
  if (symbol === "o") {
    XSide.classList.remove("active");
    OSide.classList.add("active");
  } else {
    XSide.classList.add("active");
    OSide.classList.remove("active");
  }
}

function switchTurns() {
  if (currentPlayer === "o") {
    currentPlayer = "x";
    makePlayerActive(currentPlayer);
  } else {
    currentPlayer = "o";
    makePlayerActive(currentPlayer);
  }
}

gameBoard.addEventListener("click", function (e) {
  if (e.target.classList.contains("board__cell")) {
    //to put the symbol one line in the square.
    if (e.target.textContent === "") {
      e.target.textContent = currentPlayer;
      if (hasPlayerWon(boardCells, currentPlayer)) {
        alert("Player " + currentPlayer + " Got Point");
        if (currentPlayer === "x") {
          XScoreValue++;
          XScore.textContent = XScoreValue;
        } else {
          OScoreValue++;
          OScore.textContent = OScoreValue;
        }
        checkTerminalAndReset();
      } else if (isBoardFull()) {
        alert("It's a draw!");
        checkTerminalAndReset();
        console.log(
          "after the check for terminal state which is the draw caused by me"
        );
      } else {
        switchTurns();
        console.log("turns switched normally");
        makeMinimaxMove();
        console.log("DID I MAKE IT ?");
      }
    }
  }
});

// it gets the best move in i and j then play it then flip the turn
function makeMinimaxMove() {
  const bestMoveCell = findBestMove(boardCells); // here the i and j coordinates for the best move
  bestMoveCell.textContent = currentPlayer;

  if (hasPlayerWon(boardCells, currentPlayer)) {
    alert("Player " + currentPlayer + " Got Point");
    if (currentPlayer === "x") {
      XScoreValue++;
      XScore.textContent = XScoreValue;
    } else {
      OScoreValue++;
      OScore.textContent = OScoreValue;
    }
    checkTerminalAndReset();
    console.log("dddd");
    switchTurns();
  } else if (isBoardFull()) {
    alert("It's a draw!");
    checkTerminalAndReset();
  } else {
    switchTurns();
  }
}

function checkTerminalAndReset() {
  if (currentRoundValue === numberOfRounds) {
    console.log("end");
    // check who is the one with high score and make him win
    if (XScoreValue > OScoreValue) {
      alert("Player 'X' WON THE MATCH!");
    } else if (XScoreValue < OScoreValue) {
      alert("Player 'O' WON THE MATCH!");
    } else {
      alert("DRAW!");
    }
    resetBoard();
    XScore.textContent = 0;
    OScore.textContent = 0;
    XScoreValue = 0;
    OScoreValue = 0;
    currentRound.textContent = `Round: 1`;
    currentRoundValue = 1;
    return;
  }
  currentRoundValue++;
  currentRound.textContent = `Round: ${currentRoundValue}`;
  resetBoard();
}

function findBestMove(boardCells) {
  let bestMove = null;
  let bestScore = Number.MIN_SAFE_INTEGER; // because we want to pic the best move of all of the moves in the current state of the board

  // here we traverse the board to get the best score out of all of the available
  // places
  for (let cell of boardCells) {
    if (cell.textContent === "") {
      cell.textContent = aiSymbol; //ai places his symbol in a position to see the results of this position
      // where the ai start to look for the best cell to make his move, he start by
      // exploring all the cells
      // he places his move in the first available cell
      // then he start the minimax with minimizing to see the best move of the
      // opponent
      // if he found the best move for the opponent the ai puts his move in it
      // preventing the player from playing optimally

      //here we switch the turn so the ai let the opponent play after him and see what is the result
      let score = minimax(
        boardCells,
        false,
        Number.NEGATIVE_INFINITY,
        Number.POSITIVE_INFINITY
      ); // false indicating that its not the ai's move(the ai is letting the opponent play)
      cell.textContent = ""; //undo the move so we can check another available move

      if (score > bestScore) {
        // we pic the best move out of all the possible moves
        bestScore = score;
        bestMove = cell;
        console.log(bestMove);
      }
    }
  }
  return bestMove;
}

function minimax(boardCells, isMaximizing, alpha, beta) {
  if (hasPlayerWon(boardCells, userSymbol)) {
    //if the opponent wins minimize
    return -1;
  } else if (hasPlayerWon(boardCells, aiSymbol)) {
    //if ai wins maximize
    return 1;
  } else if (isBoardFull()) {
    //if tie natural
    return 0;
  }

  if (isMaximizing) {
    let maxEval = -1;
    for (let cell of boardCells) {
      if (cell.textContent === "") {
        cell.textContent = aiSymbol;
        let evaluate = minimax(boardCells, false, alpha, beta);
        cell.textContent = ""; //undo the move
        maxEval = Math.max(maxEval, evaluate);
        alpha = Math.max(alpha, eval);
        if (beta <= alpha) {
          break; // beta cut-off
        }
      }
    }
    return maxEval;
  } else {
    // it calculates the best for the player and reduces the score
    let minEval = 1;
    for (let cell of boardCells) {
      if (cell.textContent === "") {
        cell.textContent = userSymbol;
        let evaluate = minimax(boardCells, true, alpha, beta);
        cell.textContent = ""; //undo the move
        minEval = Math.min(minEval, evaluate);
        beta = Math.min(beta, eval);
        if (beta <= alpha) {
          break; // alpha cut-off
        }
      }
    }
    return minEval;
  }
}

function hasPlayerWon(boardCells, player) {
  //check rows, columns, and diagonals
  const tempBoard = fillTempBoard(boardCells);

  for (let i = 0; i < 3; i++) {
    //this one for columns
    if (
      tempBoard[i][0].textContent === player &&
      tempBoard[i][1].textContent === player &&
      tempBoard[i][2].textContent === player
    ) {
      return true;
    }
    //this one for rows
    if (
      tempBoard[0][i].textContent === player &&
      tempBoard[1][i].textContent === player &&
      tempBoard[2][i].textContent === player
    ) {
      return true;
    }
  }
  // here its only two dagonals to check them
  //this one for left diagonal
  if (
    tempBoard[0][0].textContent === player &&
    tempBoard[1][1].textContent === player &&
    tempBoard[2][2].textContent === player
  ) {
    return true;
  }
  //this one for right diagonal
  if (
    tempBoard[0][2].textContent === player &&
    tempBoard[1][1].textContent === player &&
    tempBoard[2][0].textContent === player
  ) {
    return true;
  }
  return false;
}

function fillTempBoard(boardCells) {
  const tempBoard = [];
  let index = 0;
  for (let i = 0; i < 3; i++) {
    tempBoard[i] = [];
    for (let j = 0; j < 3; j++) {
      tempBoard[i][j] = boardCells[index];
      index++;
    }
  }
  return tempBoard;
}

function isBoardFull() {
  for (let cell of boardCells) {
    if (cell.textContent === "") {
      return false;
    }
  }
  return true;
}

function resetBoard() {
  for (let cell of boardCells) {
    cell.textContent = "";
  }
}
