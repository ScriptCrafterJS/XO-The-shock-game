"use strict";
const modesContainer = document.querySelector(".home-section__modes");
modesContainer.addEventListener("click", function (e) {
  if (e.target.closest(".mode-btn").classList.contains("single-player")) {
    localStorage.setItem("playing-mode", "single-player");
  } else {
    localStorage.setItem("playing-mode", "multi-player");
  }
});
