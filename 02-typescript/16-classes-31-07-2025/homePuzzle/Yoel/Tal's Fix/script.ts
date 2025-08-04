class FootballPlayer {
  name: string;
  yearOfBirth: number;
  position: string;
  team: string;
  imageUrl?: string;
  playerElement?: HTMLElement;
  location: { x: number; y: number };

  constructor(
    name: string,
    yearOfBirth: number,
    position: string,
    team: string,
    domElement?: HTMLElement,
    imageUrl?: string
  ) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.position = position;
    this.team = team;
    this.imageUrl = imageUrl;
    this.location = { x: 0, y: 0 };

    if (domElement) {
      this.render(domElement);
    }
  }

  render(container: HTMLElement) {
    try {
      this.playerElement = document.createElement("div");
      if (!this.playerElement)
        throw new Error("Failed to create player element");

      this.playerElement.innerHTML = `<img class="player" src="${this.imageUrl}" alt="${this.name}" style="width: 100px; height: 100px;">`;
      container.appendChild(this.playerElement);
    } catch (error) {
      console.error("Error rendering player:", error);
    }
  }

  renderImagePosition(): void {
    try {
      if (!this.playerElement) throw new Error("Player element is not defined");

      this.playerElement.style.position = "absolute";
      this.playerElement.style.top = `${this.location.y * 100}px`;
      this.playerElement.style.left = `${this.location.x * 100}px`;
    } catch (error) {
      console.error("Error rendering image position:", error);
    }
  }

  getInfo(): string {
    return `${this.name} is ${this.age} years old, plays as ${this.position} for ${this.team}`;
  }

  get age(): number {
    return new Date().getFullYear() - this.yearOfBirth;
  }

  move(direction: "left" | "right" | "up" | "down"): void {
    try {
      switch (direction) {
        case "left":
          this.location.x -= 1;
          break;
        case "right":
          this.location.x += 1;
          break;
        case "up":
          this.location.y -= 1;
          break;
        case "down":
          this.location.y += 1;
          break;
        default:
          throw new Error("Invalid direction");
      }

      if (!this.playerElement) throw new Error("Player element is not defined");

      this.playerElement.style.top = `${this.location.y * 100}px`;
      this.playerElement.style.left = `${this.location.x * 100}px`;
      console.log(`Player moved to (${this.location.x}, ${this.location.y})`);
      this.renderImagePosition();
    } catch (error) {
      console.error("Error moving player:", error);
    }
  }
}

const messi = new FootballPlayer(
  "Lionel Messi",
  1987,
  "Forward",
  "Inter Miami",
  document.getElementById("player") as HTMLElement,
  "https://media.cnn.com/api/v1/images/stellar/prod/221208164147-argentina-lionel-messi.jpg?c=16x9&q=h_833,w_1480,c_fill"
);
