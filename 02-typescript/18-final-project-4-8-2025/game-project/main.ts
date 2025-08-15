import { GameController } from './controllers/GameController';

window.addEventListener('load', () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const game = new GameController(canvas, ctx);
    game.start();
  } else {
    console.error('Canvas context not available');
  }
});