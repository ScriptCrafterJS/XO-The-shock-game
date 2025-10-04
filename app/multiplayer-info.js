const XPlayerInput = document.getElementById("player-1");
const OPlayerInput = document.getElementById("player-2");
let XPlayerName = document.querySelector(".x-player-name");
let OPlayerName = document.querySelector(".o-player-name");
const btnPlay = document.querySelector(".btnSubmit");
const numberOfRounds = document.getElementById("rounds");
const OFirst = document.getElementById("o-first");

XPlayerInput.addEventListener("input", function (e) {
  XPlayerName.textContent = e.target.value;
});
OPlayerInput.addEventListener("input", function (e) {
  OPlayerName.textContent = e.target.value;
});

btnPlay.addEventListener("click", function (e) {
  console.log("ddd");
  e.preventDefault();
  let firstPlayer = "x";
  if (OFirst.checked) {
    firstPlayer = "o";
  }
  if (
    XPlayerInput.value !== "" &&
    XPlayerInput.value !== null &&
    OPlayerInput.value !== "" &&
    OPlayerInput !== null &&
    numberOfRounds.value >= 1 &&
    numberOfRounds.value <= 5
  ) {
    const playersData = {
      numberOfRounds: numberOfRounds.value,
      XPlayerName: XPlayerName.textContent,
      OPlayerName: OPlayerName.textContent,
      firstPlayer: firstPlayer,
    };
    localStorage.setItem("playersData", JSON.stringify(playersData));
    const hostname = window.location.hostname;
    const port = window.location.port;
    window.location.href = `gameplay.html`;
  } else {
    alert("Please Fill Your Information");
  }
});
