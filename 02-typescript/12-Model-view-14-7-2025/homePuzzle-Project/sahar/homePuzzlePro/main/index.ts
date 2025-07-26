// data
interface Ball {
  img: string;
  x: number;
  y: number;
  radius: number;
}

const ball: Ball = {
  img: "./ball.png",
  x: 50,
  y: 50,
  radius: 7,
};

const gate: Ball = {
  img: "./gate.avif",
  x: 65,
  y: 40,
  radius: 5,
};

// view functions

function htmlBall(ball: Ball): string {
  return `<img src="${ball.img}" class="ball" style="left: ${ball.x}vw; top: ${ball.y}vh;">`;
}
function htmlGate(gate: Ball): string {
  return `<img src="${gate.img}" class="gate" style="left: ${gate.x}vw; top: ${gate.y}vh;">`;
}

function renderBall(ball: Ball): void {
  try {
    const ballElement = document.getElementById("rootBall");
    if (!ballElement) throw new Error("Ball element not found");

    ballElement.innerHTML = htmlBall(ball);
  } catch (error) {
    console.error("Error rendering ball:", error);
  }
}

function renderGate(gate: Ball): void {
  try {
    const gateElement = document.getElementById("rootGate");
    if (!gateElement) throw new Error("gate element not found");

    gateElement.innerHTML = htmlGate(gate);
  } catch (error) {
    console.error("Error rendering ball:", error);
  }
}

renderBall(ball);

// controller functions
function handleKeyDown(event: KeyboardEvent): void {
  console.log("Key pressed:", event.key);

  //model
  getNewBallPosition(event);

  //view
  renderBall(ball);
  handleGoal();
}

//model functions
function getNewBallPosition(event: KeyboardEvent): void {
  const step = 5; // pixels to move
  switch (event.key) {
    case "ArrowUp":
      ball.y -= step;
      console.log(ball.y);
      console.log(ball.x);
      break;
    case "ArrowDown":
      ball.y += step;
      console.log(ball.y);
      console.log(ball.x);
      break;
    case "ArrowLeft":
      ball.x -= step;
      console.log(ball.y);
      console.log(ball.x);
      break;
    case "ArrowRight":
      ball.x += step;
      console.log(ball.y);
      console.log(ball.x);
      break;
    default:
      console.log("Invalid key pressed");
      console.log(ball.y);
      console.log(ball.x);
  }
}

function handleMousePress(event: MouseEvent): void {
  const clickXvw = (event.clientX / window.innerWidth) * 100;
  const clickYvh = (event.clientY / window.innerHeight) * 100;

  // לחשב מרחק בין הלחיצה למרכז הכדור
  const dx = clickXvw - ball.x;
  const dy = clickYvh - ball.y;
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance <= ball.radius) {
    // console.log("כפתור נלחץ בתוך תחום הכדור");
    mouseP(event); // תבצע את הפעולה רק אם זה בתוך תחום הכדור
  } else {
    // console.log("הקליק היה מחוץ לתחום הכדור");
  }
}

function mouseP(event): void {
  ball.img = "./exploded.avif";
  renderBall(ball);

  setTimeout(() => {
    ball.img = "./ball.png";
    ball.x = Math.random() * 100;
    ball.y = Math.random() * 100;
    renderBall(ball);
  }, 2000);
}

function handleNewGoal() {
  console.log("first");
  (gate.x = Math.random() * 100),
    (gate.y = Math.random() * 100),
    renderGate(gate);
}

function checkGoal(gate : Ball, ball:Ball):boolean{
    const dx = gate.x-ball.x;
    const dy = gate.y-ball.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <=(gate.radius+ball.radius);
}
let goalHappened = false;

function handleGoal() {
  renderGate(gate);
  renderBall(ball);

  const isGoal = checkGoal(gate, ball);
  
  if (isGoal && !goalHappened) {
    goalHappened = true;
    gate.img="./confiti.png"
 setTimeout(() => {
    gate.img="./gate.avif",
    gate.x = Math.random() * 100;
    gate.y = Math.random() * 100;
    renderGate(gate);
    handleNewGoal();
  }, 2000);

  } 

  if (!isGoal) {
    goalHappened = false;
  }
}