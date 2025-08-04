// ✅ CLASS: Field (make sure it's only declared once)
class Field {
  width: number;
  height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  isInside(x: number, y: number): boolean {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }

  draw(players: Player[]): void {
    for (let y = 0; y < this.height; y++) {
      let row = "";
      for (let x = 0; x < this.width; x++) {
        const playerHere = players.find((p) => p.x === x && p.y === y);
        row += playerHere ? playerHere.name[0] : ".";
      }
      console.log(row);
    }
  }
}

// ✅ CLASS: Player
class Player {
  name: string;
  x: number;
  y: number;
  field: Field;

  constructor(name: string, x: number, y: number, field: Field) {
    this.name = name;
    this.x = x;
    this.y = y;
    this.field = field;
  }

  move(dx: number, dy: number): string {
    const newX = this.x + dx;  // 🔍 You had newx (lowercase x), which caused issues
    const newY = this.y + dy;

    if (this.field.isInside(newX, newY)) {
      this.x = newX;
      this.y = newY;
      return `${this.name} moved to (${this.x}, ${this.y})`;
    } else {
      return `${this.name} can't move outside the field!`;
    }
  }

  getPosition(): string {
    return `${this.name} is at (${this.x}, ${this.y})`; // 🔍 You were calling getPosition() but didn’t define it yet
  }
}

// === SETUP ===
const field = new Field(5, 5); // 🔍 You accidentally used Field (uppercase) as a variable name in some places — use lowercase for variables

const players: Player[] = [
  new Player("Bar", 0, 0, field),
  new Player("Alex", 1, 1, field),
  new Player("Luna", 2, 2, field)
];

// ✅ Simulate player movement
console.log(players[0].move(1, 0));  // 🔍 Good call here
console.log(players[1].move(0, 1));
console.log(players[2].move(1, 1));

// ✅ Print current positions
for (const p of players) {
  console.log(p.getPosition()); // 🔍 You had this call but the method was missing
}

// ✅ Draw the field with player initials
console.log("\nField Layout:");
field.draw(players);
