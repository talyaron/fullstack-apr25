export class Player {
  public x: number = 100;
  public y: number = 100;
  public width: number = 50;
  public height: number = 50;
  public color: string = 'lime';
  public speed: number = 5;

  public update(keys: Record<string, boolean>): void {
    if (keys['ArrowUp']) this.y -= this.speed;
    if (keys['ArrowDown']) this.y += this.speed;
    if (keys['ArrowLeft']) this.x -= this.speed;
    if (keys['ArrowRight']) this.x += this.speed;
  }
}