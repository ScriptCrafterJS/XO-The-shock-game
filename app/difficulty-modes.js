const difficultiesContainer = document.querySelector(".difficulties");
const btnHome = document.querySelector(".btn-home");

difficultiesContainer.addEventListener("click", function (e) {
  const diffBtn = e.target.closest(".diff-btn");
  if (diffBtn.classList.contains("btn-easy")) {
    localStorage.setItem("diff-mode", "easy");
  } else if (diffBtn.classList.contains("btn-medium")) {
    localStorage.setItem("diff-mode", "medium");
  } else {
    localStorage.setItem("diff-mode", "hard");
  }
});

btnHome.addEventListener("click", function (e) {
  localStorage.clear();
});
