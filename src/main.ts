import { Physics } from './physics';
import { Render } from './render';
import './style.css';

export function initWorld() {
  const firstBody = Physics.createBody({
    position: { x: 100, y: 500 },
    speed: { x: 300, y: -300 },
  });
  const secondBody = Physics.createBody({
    position: { x: 400, y: 500 },
    speed: { x: 300, y: -400 },
  });

  const firstConstraint = Physics.createStaticConstraint({
    position: firstBody.position,
    bodyId: firstBody.id,
  });

  const world: Physics.World = {
    bodies: [firstBody, secondBody],
    constraints: [firstConstraint],
    gravity: { x: 0, y: 200 },
  };

  return world;
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

  let world = initWorld();

  let lastFrameTime: number | null = null;
  const animationFrame = (time: number) => {
    if (lastFrameTime) {
      const deltaTime = time - lastFrameTime;
      const deltaTimeSeconds = deltaTime / 1000;

      world = Physics.updateWorld(world, deltaTimeSeconds);

      context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      Render.drawWorld(world, context);
    }
    lastFrameTime = time;
    window.requestAnimationFrame(animationFrame);
  };
  window.requestAnimationFrame(animationFrame);
}

main();
