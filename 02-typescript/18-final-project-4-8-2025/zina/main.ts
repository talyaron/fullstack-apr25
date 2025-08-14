import { Player } from "./player.js";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

canvas.width = 800;
canvas.height = 600;

const player = new Player(100, 100);

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.draw(ctx);
  requestAnimationFrame(update);
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowUp":
      player.move("up");
      break;
    case "ArrowDown":
      player.move("down");
      break;
    case "ArrowLeft":
      player.move("left");
      break;
    case "ArrowRight":
      player.move("right");
      break;
  }
});

update();
