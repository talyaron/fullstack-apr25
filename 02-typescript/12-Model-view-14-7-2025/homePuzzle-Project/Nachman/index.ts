// Data
interface BallState {
  src: string;
  x: number;
  y: number;
}

const ballState: BallState = {
  src: "./soccer.png",
  x: 40,
  y: 40,
};

function render(): void {
  const stage = document.getElementById("stage");
  if (!stage) return;

  stage.innerHTML = `<img src="${ballState.src}" 
                        class="ball" 
                        style="left: ${ballState.x}vw; top: ${ballState.y}vh;"
                        onclick="explode()" />`;
}

function moveBall(key: string): void {
  const step = 5;
  if (key === "ArrowUp") ballState.y -= step;
  if (key === "ArrowDown") ballState.y += step;
  if (key === "ArrowLeft") ballState.x -= step;
  if (key === "ArrowRight") ballState.x += step;
}

function onKey(e: KeyboardEvent): void {
  moveBall(e.key);
  render();
}

function explode(): void {
  ballState.src = "./explosion.png";
  render();

  setTimeout(() => {
    const stage = document.getElementById("stage");
    if (stage) stage.innerHTML = "";
  }, 500);

  setTimeout(() => {
    ballState.src = "./soccer.png";
    ballState.x = Math.floor(Math.random() * 90);
    ballState.y = Math.floor(Math.random() * 90);
    render();
  }, 2000);
}

window.addEventListener("keydown", onKey);
(window as any).explode = explode;

render();
