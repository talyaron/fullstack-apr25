interface Ball {
  x: number;
  y: number;
  img: string;
}

const white: Ball[] = [
  {
    x: getRandomNumber(),
    y: getRandomNumber(),
    img: "whiteBall.png",
  },
];

const goal: Ball = {
  x: getRandomNumber(),
  y: getRandomNumber(),
  img: "coin.png",
};

const explosion: Ball = {
  x: white[0].x,
  y: white[0].y,
  img: "explosion.gif",
};

let points: number = 0;
const step: number = 30;
let speedFactor: number = 200;
let intervalId: number | null = null;

let direction: "up" | "down" | "left" | "right" | null = null;
let previousDirection = "";


// Points  ! //

const countPoints = (variableA: number, variableB: string) => {
  const pointsHTML = document.getElementById(variableB);
  try {
    if (!pointsHTML) throw new Error("Element named points not found");
    pointsHTML.innerText = variableA.toString();
  } catch (error) {
    console.error("countPoints can't run", error);
  }
};

function makeBorder(): void {
  const border = document.querySelector("#border") as HTMLElement;
  border.style.width = "850px";
  border.style.height = "850px";
}

function ballImage(ball: Ball): string {
  return `<img src="${ball.img}" class="ball" style="left: ${ball.x}px; top: ${ball.y}px;">`;
}

function renderImage(ball: Ball, containerId: string): void {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`${containerId} element not found`);
    return;
  }

  container.innerHTML = ballImage(ball);
}

renderImage(white[0], "whiteBall");
renderImage(goal, "goal");

function getRandomNumber(): number {
  let randomnumber: number = 1;

  while (randomnumber % 2 !== 0 || randomnumber === 0) {
    randomnumber = Math.floor(Math.random() * 850);
  }

  return randomnumber;
}



function makeKeyboardEvent(event: KeyboardEvent): void {
  switch (event.key) {
    case "ArrowUp":
    case "w":
      direction = "up";
      break;
    case "ArrowDown":
    case "s":
      direction = "down";
      break;
    case "ArrowLeft":
    case "a":
      direction = "left";
      break;
    case "ArrowRight":
    case "d":
      direction = "right";
      break;

    default:
      console.log("Invalid command", event.key);
  }
}

function startGameLoop() {
  if (intervalId !== null) {
    clearInterval(intervalId);
  }

  intervalId = setInterval(() => {
    if (direction === "up") white[0].y -= step;
    else if (direction === "down") white[0].y += step;
    else if (direction === "left") white[0].x -= step;
    else if (direction === "right") white[0].x += step;

    for (let i = white.length - 1; i > 0; i--) {
      white[i].x = white[i - 1].x;
      white[i].y = white[i - 1].y;
    }
    //checking limits of the ball//
    if (
      white[0].x < 0 ||
      white[0].x > 850 ||
      white[0].y < 0 ||
      white[0].y > 850
    ) {
      white.splice(0, white.length)
      renderImage(explosion, "whiteBall");
    }
    if (direction) {
      renderImage(white[0], "whiteBall");
      checkRange();
      renderWhite();
    }
  }, speedFactor);
}
function GameStart(event: KeyboardEvent): void {
  makeBorder();
  makeKeyboardEvent(event);
  renderImage(white[0], "whiteBall");
  renderImage(goal, "goal");
  renderWhite();

  if (intervalId === null) {
    startGameLoop();
  }
}

function renderWhite(): void {
  const container = document.getElementById("whiteBall");
  if (!container) {
    console.error("whiteBall container not found");
    return;
  }

  let whiteHTML = "";
  white.forEach((segment) => {
    whiteHTML += `<img src="${segment.img}" class="ball" style="left: ${segment.x}px; top: ${segment.y}px;">`;
  });
  
  container.innerHTML = whiteHTML;
}

renderWhite();

function checkRange() {
  const distanceX = Math.abs(white[0].x - goal.x);
  const distanceY = Math.abs(white[0].y - goal.y);
  if (distanceX < 50 && distanceY < 50) {
    goal.x = getRandomNumber();
    goal.y = getRandomNumber();
    points += 1;
    countPoints(points, "points");
    speedFactor = speedFactor - 20;
    
    white.push({
      x: white[white.length - 1].x,
      y: white[white.length - 1].y,
      img: "whiteBall.png",
    });

    startGameLoop();

    renderImage(goal, "goal");
  }
}

document.addEventListener("keydown", makeKeyboardEvent);
