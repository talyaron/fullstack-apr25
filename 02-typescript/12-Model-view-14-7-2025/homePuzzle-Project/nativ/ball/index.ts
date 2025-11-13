const BALL_SIZE: number = 50;

interface Ball {
  x: number;
  y: number;
}

interface Goal {
  x: number;
  y: number;
}

const goal: Goal = {
  //starting the goal
  x: 0,
  y: 0,
};

const ball: Ball = {
  //starting the ball at the center of the screen
  x: 300,
  y: 300,
};
let goalTouched = false;
let score = 0;

function htmlBall(ball: Ball) {
  return `<div id="player" style="left: ${ball.x}px; top:${ball.y}px;"></div>`;
}

function htmlGoal(goal: Goal) {
  //randomly generating the goal at different places without it going outside the lines
  goal.x = Math.floor(Math.random() * (575 - 25 + 1)) + 25;
  goal.y = Math.floor(Math.random() * (575 - 25 + 1)) + 25;
  return `<div id="goal" style="left: ${goal.x}px; top:${goal.y}px;"></div>`;
}

function renderBall(ball: Ball) {
  try {
    const ballContainer = document.getElementById("ball-container");
    if (!ballContainer) return;

    ballContainer.innerHTML = htmlBall(ball);
  } catch (error) {
    console.error("Error rendering ball:", error);
  }
}

function renderGoal(goal: Goal) {
  try {
    const goalContainer = document.getElementById("goal-container");
    if (!goalContainer) return;
    goalTouched = false;
    goalContainer.innerHTML = htmlGoal(goal);
  } catch (error) {
    console.error("Error rendering goal:", error);
  }
}

renderBall(ball);
renderGoal(goal);

function handleKeyDown(event: KeyboardEvent) {
  getNewBallPosition(event);
  renderBall(ball);

  if (!goalTouched && isCollision(ball, goal)) {
    onGoalHit();
  }
}

//model functions
function getNewBallPosition(event: KeyboardEvent) {
  const step = BALL_SIZE;
  const gameZone = document.getElementById("game-zone");
  if (!gameZone) return;

  //after using transform: translate(-50%, -50%) in the css, the max X and max Y now correlate with the center of the ball
  //so i need to add half of its size, so that it doesnt go out of the lines
  const ballSize = BALL_SIZE;
  const maxX = gameZone.offsetWidth - ballSize + BALL_SIZE / 2;
  const maxY = gameZone.offsetHeight - ballSize + BALL_SIZE / 2;

  switch (event.key) {
    case "ArrowUp":
      ball.y = Math.max(BALL_SIZE / 2, ball.y - step);
      break;
    case "ArrowDown":
      ball.y = Math.min(maxY, ball.y + step);
      break;
    case "ArrowLeft":
      ball.x = Math.max(BALL_SIZE / 2, ball.x - step);
      break;
    case "ArrowRight":
      ball.x = Math.min(maxX, ball.x + step);
      break;
  }
}

function isCollision(ball: Ball, goal: Goal): boolean {
  const dx = ball.x - goal.x;
  const dy = ball.y - goal.y;
  const distanceSquared = dx * dx + dy * dy;
  const radiusSum = BALL_SIZE;

  return distanceSquared <= radiusSum * radiusSum;
}

function onGoalHit() {
  goalTouched = true;
  const goalEl = document.getElementById("goal");
  const scoreEl = document.getElementById("scoreDiv");

  if (!goalEl) return;

  goalEl.style.backgroundImage = `url("assets/rainbow.png")`;
  score++;
  if (scoreEl) {
    scoreEl!.innerHTML = `Score: ${score}`;
    console.log("added to score");
  }
  const audio = new Audio("dist/yeah_baby.mp3");
  audio.play().catch((err) => {
    console.error("Audio failed to play:", err);
  });
  setTimeout(() => {
    goalEl.remove();
    renderGoal(goal);
    console.log("rendered goal");
  }, 2000);
}
