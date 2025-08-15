import { Player } from '../models/Player';
import { Enemy } from '../models/Enemy';

export class GameView {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, 800, 600);
  }

  public drawPlayer(player: Player): void {
    this.ctx.fillStyle = player.color;
    this.ctx.fillRect(player.x, player.y, player.width, player.height);
  }

  public drawEnemy(enemy: Enemy): void {
    this.ctx.fillStyle = enemy.color;
    this.ctx.fillRect(enemy.x, enemy.y, enemy.width, enemy.height);
  }
}