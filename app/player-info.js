const username = document.getElementById("username");
const numberOfRounds = document.getElementById("rounds");
const meFirst = document.getElementById("user-first");
const btnPlay = document.querySelector(".btnSubmit");
const cardsContainer = document.querySelector(".cards");
const cards = document.querySelectorAll(".card");
const btnHome = document.querySelector(".btn-home");

cardsContainer.addEventListener("click", function (e) {
  cards.forEach((card) => {
    if (card.classList.contains("active")) {
      card.classList.remove("active");
    }
  });
  e.target.closest(".card").classList.add("active");
});

function oneCardActive() {
  return Array.from(cards).some((card) => {
    return card.classList.contains("active");
  });
}

btnPlay.addEventListener("click", function (e) {
  e.preventDefault();
  const onsIsActive = oneCardActive();
  if (
    username.value !== "" &&
    username.value !== null &&
    numberOfRounds.value >= 1 &&
    numberOfRounds.value <= 5 &&
    onsIsActive
  ) {
    const playerSymbol = cardsContainer
      .querySelector(".active")
      .querySelector(".card__symbol").textContent;
    const userData = {
      username: username.value,
      numberOfRounds: numberOfRounds.value,
      playerSymbol: playerSymbol.toLowerCase(),
      playerFirst: meFirst.checked,
    };
    // Store the data object in localStorage
    localStorage.setItem("userData", JSON.stringify(userData));
    const hostname = window.location.hostname;
    const port = window.location.port;
    window.location.href = `gameplay.html`;
  } else {
    alert("Please Fill Your Information");
  }
});
btnHome.addEventListener("click", function (e) {
  localStorage.clear();
});
