export class Enemy {
  public x: number;
  public y: number;
  public width: number = 40;
  public height: number = 40;
  public color: string = 'red';
  public speed: number = 2;

  constructor() {
    this.x = Math.random() * 700;
    this.y = Math.random() * 500;
  }

  public update(): void {
    this.x += Math.sin(Date.now() / 500) * this.speed;
    this.y += Math.cos(Date.now() / 500) * this.speed;
  }
}