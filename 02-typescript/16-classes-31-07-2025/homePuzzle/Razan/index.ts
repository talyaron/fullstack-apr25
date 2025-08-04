document.addEventListener("DOMContentLoaded", () => {
  class SoccerPlayer {
    name: string;
    yearOfBirth: number;
    position: string;
    team: string;
    imageUrl?: string;
    playerElement: HTMLElement | null = null;
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
      this.playerElement = document.createElement("div");
      this.playerElement.classList.add("player");
      this.playerElement.style.position = "absolute";
      this.playerElement.style.left = "0px";
      this.playerElement.style.top = "0px";
      this.playerElement.innerHTML = `
        <img src="${this.imageUrl}" alt="${this.name}" style="width: 100px; height: 100px;">
        <div>
          <h4>${this.name}</h4>
          <p>${this.position} - ${this.team}</p>
        </div>
      `;
      container.appendChild(this.playerElement);
    }

    get age(): number {
      return new Date().getFullYear() - this.yearOfBirth;
    }

    getInfo(): string {
      return `${this.name} is ${this.age} years old, plays as ${this.position} for ${this.team}`;
    }

    move(direction: "left" | "right" | "up" | "down") {
      switch (direction) {
        case "left":
          this.location.x = Math.max(this.location.x - 1, 0);
          break;
        case "right":
          this.location.x = Math.min(this.location.x + 1, window.innerWidth / 90 - 1);
          break;
        case "up":
          this.location.y = Math.max(this.location.y - 1, 0);
          break;
        case "down":
          this.location.y = Math.min(this.location.y + 1, window.innerHeight / 90 - 1);
          break;
      }

      if (!this.playerElement)
        throw new Error("Player element is not defined");

      this.playerElement.style.left = `${this.location.x * 90}px`;
      this.playerElement.style.top = `${this.location.y * 90}px`;

      console.log(`Player moved to (${this.location.x}, ${this.location.y})`);
    }
  }

  const container = document.getElementById("players-container")!;

  const neymar = new SoccerPlayer(
    "Neymar Jr",
    1992,
    "attacking midfielder",
    "Santos FC",
    container,
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvds6G6ZiPoQ1wuPAZHJ7anZuvyzTzCZWvQQ&s"
  );

  const messi = new SoccerPlayer(
    "Lionel Messi",
    1987,
    "forward",
    "Inter Miami",
    container,
    "https://media.cnn.com/api/v1/images/stellar/prod/221208164147-argentina-lionel-messi.jpg?c=16x9&q=h_833,w_1480,c_fill"
  );

  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowLeft":
        neymar.move("left");
        break;
      case "ArrowRight":
        neymar.move("right");
        break;
      case "ArrowUp":
        neymar.move("up");
        break;
      case "ArrowDown":
        neymar.move("down");
        break;

      case "a":
        messi.move("left");
        break;
      case "d":
        messi.move("right");
        break;
      case "w":
        messi.move("up");
        break;
      case "s":
        messi.move("down");
        break;
    }
  });
});
