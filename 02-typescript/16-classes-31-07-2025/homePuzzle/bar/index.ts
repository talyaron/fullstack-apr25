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
}

class Player {
    name: string;
    x: number;
    y: number;
    field: Field;

    constructor(name: string, field: Field) {
        this.name = name;
        this.x = 0;
        this.y = 0;
        this.field = field;
    }

    move(dx: number, dy: number): string {
        const newx = this.x + dx;
        const newY = this.y + dy;

        if (this.field.isInside(newx, newY)) {
            this.x = newX;
            this.y = newY;
            return `${this.name} moved to(${this.x}, ${this.y})`;
        } else {
            return `${this.name} cant move outside the field!`;
        }
        }

        getPosition(): string {
            return `${this.name} is at (${this.x}, ${this.y})`;
        }
    }

const player1 = new Player("Bar", field);

console.log(player1.getPosition());         // Bar is at (0, 0)
console.log(player1.move(1, 0));            // Bar moved to (1, 0)
console.log(player1.move(4, 0));            // Bar moved to (5, 0)
console.log(player1.move(1, 0));            // Bar can't move outside the field!
 

// level 2:
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
}

class Player {
  name: string;
  x: number;
  y: number;
  field: Field;

  constructor(name: string, field: Field) {
    this.name = name;
    this.x = 0;
    this.y = 0;
    this.field = field;
  }

  move(dx: number, dy: number): string {
    const newX = this.x + dx;
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
    return `${this.name} is at (${this.x}, ${this.y})`;
  }
}

const Field = new Field(5, 5);

const players: Player[] = [
  new Player("Bar", field),
  new Player("Alex", field),
  new Player("Luna", field)
];

players[0].move(1, 0);  // Bar moves right
players[1].move(0, 1);  // Alex moves down
players[2].move(2, 2);  // Luna moves diagonally

for (const p of players) {
    console.log(p.getPosition());
}

class Ball {
    private x: number;
    private y: number;

    constructor(x: number = 0, y: number = 0) {
this.x = x;
this.y = y;
  }

  setPosition(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  getPosition(): string {
    return `Ball is at (${this.x}, ${this.y})`;
  }
}

kickBall(ball: Ball, dx: number, dy: number): void {
 const newX = this.x + dx;
 const newY = this.y + dy;

 if (newX >= 0 && newX < this.field.width && newY >= 0 && newY < this.field.height) {
       Ball.setPosition( newX, newY);
       console.log(`${this.name} kicked the ball to (${newX}, ${newY})`);
  } else {
    console.log(`${this.name} tried to kick the ball out of bounds!`);
  }
    }