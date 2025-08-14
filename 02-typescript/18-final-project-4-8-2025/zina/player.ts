export class Player {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;

  constructor(x: number, y: number, width: number = 50, height: number = 50, speed: number = 5) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
  }

  move(direction: "up" | "down" | "left" | "right") {
    switch (direction) {
      case "up":
        this.y -= this.speed;
        break;
      case "down":
        this.y += this.speed;
        break;
      case "left":
        this.x -= this.speed;
        break;
      case "right":
        this.x += this.speed;
        break;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "#00f";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}