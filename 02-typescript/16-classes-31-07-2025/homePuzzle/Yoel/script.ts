class SoccerPlayer {
  playerIMG: string;
  name: string;
  location: { x: number; y: number };
  movementSize: number;
  playerElement?: HTMLElement;
  team: string;

  constructor(
    playerIMG: string,
    name: string,
    location: { x: number; y: number },
    movementSize: number,
  ) {
    this.playerIMG = playerIMG;
    this.name = name;
    this.location = location;
    this.movementSize = movementSize;
    this.render();

    
  }

  render(): void {
    try {
        const container = document.querySelector(".field") as HTMLElement;
        if (this.playerElement && this.playerElement.parentNode) {
            console.log(`${this.name} is already rendered`);
            return;
        }
    this.playerElement = document.createElement("div");
    this.playerElement.className = "player";
    this.playerElement.innerHTML = this.playerIMG;
    this.playerElement.style.transform = `translate(${this.location.x}px, ${this.location.y}px)`;


    container.appendChild(this.playerElement);
  }

    catch (error) {
        console.error("Error rendering player:", error);
  }}

  moveUp(): void {
    this.location.y -= this.movementSize;
  }
  moveDown(): void {
    this.location.y += this.movementSize;
  }
  moveLeft(): void {
    this.location.x -= this.movementSize;
  }
  moveRight(): void {
    this.location.x += this.movementSize;
  }
}



window.addEventListener("DOMContentLoaded", () => {
  try {
    
    document.addEventListener("keydown", (event) => {
      if (!tomer.playerElement)
        throw new Error("Player element is not defined");
        
      switch (event.key) {
        case "ArrowUp":
          if (tomer.location.y - tomer.movementSize < 30) {
            console.warn("Cannot move up, out of bounds");
            return;
          }
          tomer.moveUp();
          break;
        case "ArrowDown":
          if (tomer.location.y + tomer.movementSize > 720) {
            console.warn("Cannot move down, out of bounds");
            return;
          }
          tomer.moveDown();
          break;
        case "ArrowLeft":
          if (tomer.location.x - tomer.movementSize < 90) {
            console.warn("Cannot move left, out of bounds");
            return;
          }
          tomer.moveLeft();
          break;
        case "ArrowRight":
          if (tomer.location.x + tomer.movementSize > 1350) {
            console.warn("Cannot move right, out of bounds");
            return;
          }
          tomer.moveRight();
          break;
        default:
          console.warn("Unsupported key pressed:", event.key);
          
          return;
      }
      tomer.playerElement.style.transform = `translate(${tomer.location.x}px, ${tomer.location.y}px)`;
      console.log(`Player moved to: (${tomer.location.x}, ${tomer.location.y})`);
    });
  } catch (error) {
    console.error("Error handling keydown event:", error);
  }
});

window.addEventListener("DOMContentLoaded", () => {
  try {
    
    document.addEventListener("keydown", (event) => {
      if (!tal.playerElement)
        throw new Error("Player element is not defined");
      switch (event.key) {
        case "w":
          if (tal.location.y - tal.movementSize < 30) {
            console.warn("Cannot move up, out of bounds");
            return;
          }
          tal.moveUp();
          break;
        case "s":
          if (tal.location.y + tal.movementSize > 720) {
            console.warn("Cannot move down, out of bounds");
            return;
          }
          tal.moveDown();
          break;
        case "a":
          if (tal.location.x - tal.movementSize < 90) {
            console.warn("Cannot move left, out of bounds");
            return;
          }
          tal.moveLeft();
          break;
        case "d":
          if (tal.location.x + tal.movementSize > 1350) {
            console.warn("Cannot move right, out of bounds");
            return;
          }
          tal.moveRight();
          break;
        default:
          console.warn("Unsupported key pressed:", event.key);
          
          return;
      }
      tal.playerElement.style.transform = `translate(${tal.location.x}px, ${tal.location.y}px)`;
      console.log(`Player moved to: (${tal.location.x}, ${tal.location.y})`);
    });
  } catch (error) {
    console.error("Error handling keydown event:", error);
  }
});


// PLAYERS //

const tomer = new SoccerPlayer(
  "<img src='./images/tomer.jpg' alt='Tomer'>",
  "Tomer",
  { x: 1170, y: 360 },
  30
  
);

const tal = new SoccerPlayer(
  "<img src='./images/tall.png' alt='Tal'>",
  "Tal",
  { x: 270, y: 360 },
  30

);