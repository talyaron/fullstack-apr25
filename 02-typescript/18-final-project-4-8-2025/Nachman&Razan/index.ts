// MODEL
interface Bullet {
  element: HTMLDivElement;
  intervalId: number;
}

interface Ball {
  element: HTMLDivElement;
  x: number;
  y: number;
  radius: number;
  intervalId: number;
}

class GameModel {
  bullets: Bullet[] = [];
  balls: Ball[] = [];

  addBullet(bullet: Bullet): void {
    this.bullets.push(bullet);
  }

  removeBullet(bullet: Bullet): void {
    const index = this.bullets.indexOf(bullet);
    if (index !== -1) {
      clearInterval(bullet.intervalId);
      bullet.element.remove();
      this.bullets.splice(index, 1);
    }
  }

  addBall(ball: Ball): void {
    this.balls.push(ball);
  }

  removeBall(ball: Ball): void {
    const index = this.balls.indexOf(ball);
    if (index !== -1) {
      clearInterval(ball.intervalId);
      ball.element.remove();
      this.balls.splice(index, 1);
    }
  }
}


// CONTROLLER
class GameController {
  model: GameModel;
  view: GameView;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;
    this.init();
    this.spawnBalls();
  }

  init(): void {
    this.view.background.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.view.background.addEventListener("click", this.handleClick.bind(this));
  }

  handleMouseMove(e: MouseEvent): void {
    const backgroundRect = this.view.background.getBoundingClientRect();
    const cannonWidth = this.view.cannon.offsetWidth;
    let x = e.clientX - backgroundRect.left - cannonWidth / 2;

    if (x < 0) x = 0;
    if (x > backgroundRect.width - cannonWidth) x = backgroundRect.width - cannonWidth;

    this.view.moveCannon(x);
  }

  handleClick(): void {
    const cannonRect = this.view.cannon.getBoundingClientRect();
    const backgroundRect = this.view.background.getBoundingClientRect();

    const bulletX = cannonRect.left + cannonRect.width / 2 - backgroundRect.left - 2.5;
    const bulletY = cannonRect.top - backgroundRect.top;

    const bulletEl = this.view.createBullet(bulletX, bulletY);

    const intervalId = window.setInterval(() => {
      const top = parseFloat(bulletEl.style.top);
      if (top <= -20) {
        this.model.removeBullet({ element: bulletEl, intervalId });
      } else {
        bulletEl.style.top = `${top - 10}px`;
        this.checkCollision();
      }
    }, 20);

    this.model.addBullet({ element: bulletEl, intervalId });
  }

  createBall(): void {
    const ballEl = document.createElement("div");
    ballEl.classList.add("ball");

    const radius = 15 + Math.random() * 35;
    const margin = 20;
    const x = margin + Math.random() * (this.view.background.offsetWidth - radius * 2 - margin * 2);
    let y = 0;

    ballEl.style.width = ballEl.style.height = `${radius * 2}px`;
    ballEl.style.left = `${x}px`;
    ballEl.style.top = `${y}px`;

    this.view.background.appendChild(ballEl);

    const hue = Math.floor(Math.random() * 360);
    ballEl.style.setProperty('--hue', `${hue}`);
    ballEl.classList.add("ball", "random-color");

    const ball: Ball = {
      element: ballEl,
      x,
      y,
      radius,
      intervalId: window.setInterval(() => {
        y += 2;
        ball.y = y;
        ballEl.style.top = `${y}px`;

        if (y > this.view.background.offsetHeight) {
          this.model.removeBall(ball);
        }
      }, 16),
    };

    this.model.addBall(ball);
  }

  spawnBalls(): void {
    setInterval(() => this.createBall(), 1500);
  }

  checkCollision(): void {
    this.model.bullets.forEach((bullet) => {
      const bulletRect = bullet.element.getBoundingClientRect();

      this.model.balls.forEach((ball) => {
        const ballRect = ball.element.getBoundingClientRect();

        const collision =
          bulletRect.left < ballRect.right &&
          bulletRect.right > ballRect.left &&
          bulletRect.top < ballRect.bottom &&
          bulletRect.bottom > ballRect.top;

        if (collision) {
          this.model.removeBall(ball);
          this.model.removeBullet(bullet);
        }
      });
    });
  }
}

// VIEW
class GameView {
  cannon: HTMLImageElement;
  background: HTMLElement;

  constructor() {
    this.cannon = document.getElementById("cannon") as HTMLImageElement;
    this.background = document.querySelector(".game-container__background") as HTMLElement;
  }

  moveCannon(x: number): void {
    this.cannon.style.left = `${x}px`;
  }

  createBullet(x: number, y: number): HTMLDivElement {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    bullet.style.left = `${x}px`;
    bullet.style.top = `${y}px`;
    this.background.appendChild(bullet);
    return bullet;
  }
}


// INIT
document.addEventListener("DOMContentLoaded", () => {
  const model = new GameModel();
  const view = new GameView();
  new GameController(model, view);
});