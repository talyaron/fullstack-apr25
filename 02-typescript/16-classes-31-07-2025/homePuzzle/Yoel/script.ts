class SoccerPlayer {
  playerIMG: string;
  name: string;
location: { x: number; y: number; };
  movementSize:number;

  constructor(playerIMG: string, name: string, location: { x: number; y: number; }, movementSize:number) {
    this.playerIMG = playerIMG;
    this.name = name;
    this.location = location;
    this.movementSize = movementSize
  }
  moveUp():void {
    this.y += this.movementSize;
  }
  moveDown():void {
    this.y -= this.movementSize;
  }
  moveLeft():void {
    this.x += this.movementSize;
  }
  moveRight():void {
    this.x -= this.movementSize;
  }

  
}


const tomer = new SoccerPlayer("linkImage", "Tomer", 0, 0, 5)