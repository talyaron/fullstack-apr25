import { Player } from '../models/Player';
import { Enemy } from '../models/Enemy';
import { GameView } from '../views/GameView';

export class GameController {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: Enemy[];
  private view: GameView;

  constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = new Player();
    this.enemies = [new Enemy()];
    this.view = new GameView(ctx);
  }

  public start(): void {
    this.loop();
  }

  private loop(): void {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }

  private update(): void {
    this.player.update();
    this.enemies.forEach(enemy => enemy.update());
  }

  private draw(): void {
    this.view.clear();
    this.view.drawPlayer(this.player);
    this.enemies.forEach(enemy => this.view.drawEnemy(enemy));
  }
}