let score = sessionStorage.getItem("score") ? JSON.parse(sessionStorage.getItem("score")!) : 0;
let maxScore = localStorage.getItem("maxscore") ? JSON.parse(localStorage.getItem("maxscore")!) : 0;
console.log(score);
console.log(maxScore);
function renderScore(): void {
  try {
    const scoreinhtml = document.getElementById("scoreRoot");
    if (!scoreinhtml) throw new Error("scoreRoot not found");
    sessionStorage.setItem("score", JSON.stringify(score));
    scoreinhtml.innerHTML = score;
    const maxscoreinhtml = document.getElementById("maxscoreRoot");
    if (!maxscoreinhtml) throw new Error("maxscoreRoot not found");
    sessionStorage.setItem("maxscore", JSON.stringify(maxScore));
    maxScore = score > maxScore ? score : maxScore;
    localStorage.setItem("maxscore", JSON.stringify(maxScore));
    maxscoreinhtml.innerHTML = maxScore;
  } catch (error) {
    console.error(error);
  }
}
function add(): void {
  if (score < 100) score++;
  renderScore();
}
function minus(): void {
  if (score > 0) score--;
  renderScore();
}

window.addEventListener("DOMContentLoaded", () => {
  try {
    renderScore();
    const addButton = document.getElementById("add");
    if (!addButton) throw new Error("add buton not found");
    addButton.addEventListener("click", add);
    const minusButton = document.getElementById("minus");
    if (!minusButton) throw new Error("minus buton not found");
    minusButton.addEventListener("click", minus);
  } catch (error) {
    console.error(error);
  }
});
