import { Physics } from './physics';
import './style.css';

function drawWorld(world: Physics.World, context: CanvasRenderingContext2D) {
  world.bodies.forEach((body) => {
    context.beginPath();
    context.arc(body.position.x, body.position.y, 20, 0, 2 * Math.PI);
    context.fill();
  });
}

function main() {
  const mainCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight;

  const context = mainCanvas.getContext('2d');
  if (!context) {
    console.error('Failed to create a 2d context');
    return;
  }

  let world = Physics.initWorld();

  let lastFrameTime: number | null = null;
  const animationFrame = (time: number) => {
    if (lastFrameTime) {
      const deltaTime = time - lastFrameTime;
      const deltaTimeSeconds = deltaTime / 1000;

      world = Physics.updateWorld(world, deltaTimeSeconds);

      context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      drawWorld(world, context);
    }
    lastFrameTime = time;
    window.requestAnimationFrame(animationFrame);
  };
  window.requestAnimationFrame(animationFrame);
}

main();
