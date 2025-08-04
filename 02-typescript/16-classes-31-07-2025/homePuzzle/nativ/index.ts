const PLAYER_SIZE = 50;
const STEP = 50;
const BALL_SIZE = 40;
const KICK_RANGE = 60;

interface KeyBindings {
  left: string;
  right: string;
  up: string;
  down: string;
}

class FootballPlayer {
  name: string;
  yearOfBirth: number;
  position: string;
  team: string;
  playerElement?: HTMLElement;
  imageUrl: string;
  keyBindings: KeyBindings;
  location: { x: number; y: number };

  constructor(
    name: string,
    yearOfBirth: number,
    position: string,
    team: string,
    container: HTMLElement,
    imageUrl: string,
    keyBindings: KeyBindings,
    location: { x: number; y: number }
  ) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.position = position;
    this.team = team;
    this.imageUrl = imageUrl;
    this.keyBindings = keyBindings;
    this.location = location;

    this.render(container);
  }

  get age(): number {
    return new Date().getFullYear() - this.yearOfBirth;
  }

  getInfo(): string {
    return `${this.name} is ${this.age} years old, plays as ${this.position} for ${this.team}`;
  }

  render(container: HTMLElement) {
    this.playerElement = document.createElement("div");
    this.playerElement.className = "player";
    this.playerElement.innerHTML = `<img src="${this.imageUrl}" alt="${this.name}">`;

    this.playerElement.style.position = "absolute";
    this.playerElement.style.left = `${this.location.x}px`;
    this.playerElement.style.top = `${this.location.y}px`;
    this.playerElement.style.transform = "translate(-50%, -50%)";

    container.appendChild(this.playerElement);
  }

  move(direction: "left" | "right" | "up" | "down") {
    const gameZone = document.getElementById("game-zone");
    if (!gameZone || !this.playerElement) return;

    const maxX = gameZone.offsetWidth - PLAYER_SIZE / 2;
    const maxY = gameZone.offsetHeight - PLAYER_SIZE / 2;
    const minX = PLAYER_SIZE / 2;
    const minY = PLAYER_SIZE / 2;

    switch (direction) {
      case "left":
        this.location.x = Math.max(minX, this.location.x - STEP);
        break;
      case "right":
        this.location.x = Math.min(maxX, this.location.x + STEP);
        break;
      case "up":
        this.location.y = Math.max(minY, this.location.y - STEP);
        break;
      case "down":
        this.location.y = Math.min(maxY, this.location.y + STEP);
        break;
    }

    this.playerElement.style.left = `${this.location.x}px`;
    this.playerElement.style.top = `${this.location.y}px`;

    console.log(
      `${this.name} moved to (${this.location.x}, ${this.location.y})`
    );
  }
}

class Ball {
  x: number;
  y: number;
  ballElement?: HTMLElement;

  constructor(x: number, y: number, container: HTMLElement) {
    this.x = x;
    this.y = y;
    this.render(container);
  }

  render(container: HTMLElement) {
    this.ballElement = document.createElement("div");
    this.ballElement.className = "ball";
    this.ballElement.style.position = "absolute";
    this.ballElement.style.left = `${this.x}px`;
    this.ballElement.style.top = `${this.y}px`;
    this.ballElement.style.transform = "translate(-50%, -50%)";
    container.appendChild(this.ballElement);
  }

  moveTo(x: number, y: number) {
    this.x = x;
    this.y = y;
    if (this.ballElement) {
      this.ballElement.style.left = `${x}px`;
      this.ballElement.style.top = `${y}px`;
    }
  }

  isNear(player: FootballPlayer, range: number = KICK_RANGE): boolean {
    const dx = player.location.x - this.x;
    const dy = player.location.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance <= range;
  }

  kickFrom(
    player: FootballPlayer,
    direction: "left" | "right" | "up" | "down"
  ) {
    if (!this.isNear(player)) return;

    const gameZone = document.getElementById("game-zone");
    if (!gameZone) return;

    const maxX = gameZone.offsetWidth - BALL_SIZE / 2;
    const maxY = gameZone.offsetHeight - BALL_SIZE / 2;
    const minX = BALL_SIZE / 2;
    const minY = BALL_SIZE / 2;

    let newX = this.x;
    let newY = this.y;

    switch (direction) {
      case "left":
        newX = Math.max(minX, this.x - STEP);
        break;
      case "right":
        newX = Math.min(maxX, this.x + STEP);
        break;
      case "up":
        newY = Math.max(minY, this.y - STEP);
        break;
      case "down":
        newY = Math.min(maxY, this.y + STEP);
        break;
    }

    this.moveTo(newX, newY);
    console.log(`${player.name} kicked the ball ${direction}`);
  }
}

const gameZone = document.getElementById("game-zone") as HTMLElement;

const messi = new FootballPlayer(
  "Lionel Messi",
  1987,
  "Forward",
  "Inter Miami",
  gameZone,
  "https://media.cnn.com/api/v1/images/stellar/prod/221208164147-argentina-lionel-messi.jpg?c=16x9&q=h_833,w_1480,c_fill",
  {
    left: "ArrowLeft",
    right: "ArrowRight",
    up: "ArrowUp",
    down: "ArrowDown",
  },
  { x: 200, y: 300 }
);

const ronaldo = new FootballPlayer(
  "Cristiano Ronaldo",
  1985,
  "Forward",
  "Al Nassr",
  gameZone,
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG5MFQeQueZnq67u1pk5ltllNKsT3WI3WZpQU1SAj1253E-c5p2PdngCUWxkx0hL889fxM0Bbz9UVsj4LeCykHkIVVFpe4WzjiF989LA",
  {
    left: "a",
    right: "d",
    up: "w",
    down: "s",
  },
  { x: 700, y: 300 }
);

const ball = new Ball(450, 300, gameZone);

const players = [messi, ronaldo];

document.addEventListener("keydown", (event) => {
  players.forEach((player) => {
    const { left, right, up, down } = player.keyBindings;

    switch (event.key) {
      case left:
        player.move("left");
        ball.kickFrom(player, "left");
        break;
      case right:
        player.move("right");
        ball.kickFrom(player, "right");
        break;
      case up:
        player.move("up");
        ball.kickFrom(player, "up");
        break;
      case down:
        player.move("down");
        ball.kickFrom(player, "down");
        break;
    }
  });
});
