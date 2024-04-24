"use strict";

const gameBoard = document.querySelector(".board");
const currentRound = document.querySelector(".rounds");
const XPlayer = document.querySelector(".left__player-name");
const OPlayer = document.querySelector(".right__player-name");
const XScore = document.querySelector(".left__player-score");
const OScore = document.querySelector(".left__player-score");

//default settings
let currentPlayer = "o";
let OScoreValue = 0;
let XScoreValue = 0;
let aiSymbol = "o";

const userData = JSON.parse(localStorage.getItem("userData"));
const userFirst = userData.playerFirst;
const userSymbol = userData.playerSymbol;
console.log(userFirst);
console.log(userSymbol);
if (userFirst) {
  if (userSymbol === "o") {
    aiSymbol = "x";
  } else {
    currentPlayer = "x";
  }
} else {
  if (userSymbol === "o") {
    aiSymbol = "x";
    currentPlayer = "x";
  }

  //   minimaxMove();
}

function switchTurns() {
  if (currentPlayer === "o") {
    currentPlayer = "x";
  } else {
    currentPlayer = "o";
  }
}

function gamePlay() {
  gameBoard.addEventListener("click", function (e) {
    if (e.target.classList.contains("board__cell")) {
      //to put the symbol one line in the square.
      if (e.target.textContent === "") {
        e.target.textContent = currentPlayer;
        switchTurns();
      }
    }
  });
}
gamePlay();
