// MODEL
interface Bullet {
  element: HTMLDivElement;
  intervalId: number;
}

class GameModel {
  bullets: Bullet[] = [];

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

// CONTROLLER
class GameController {
  model: GameModel;
  view: GameView;

  constructor(model: GameModel, view: GameView) {
    this.model = model;
    this.view = view;

    this.init();
  }

  init(): void {
    this.view.background.addEventListener("mousemove", this.handleMouseMove.bind(this));
    this.view.background.addEventListener("click", this.handleClick.bind(this));
  }

  handleMouseMove(e: MouseEvent): void {
  const backgroundRect = this.view.background.getBoundingClientRect();
  const cannonWidth = this.view.cannon.offsetWidth;

  // Get mouse X relative to container
  let x = e.clientX - backgroundRect.left;

  // Clamp so the cannon stays fully inside
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
      }
    }, 20);

    this.model.addBullet({ element: bulletEl, intervalId });
  }
}

// INIT
document.addEventListener("DOMContentLoaded", () => {
  const model = new GameModel();
  const view = new GameView();
  new GameController(model, view);
});
