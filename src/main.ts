import { Physics } from './physics';
import { Render } from './render';
import './style.css';
import { Vector } from './vector';

export function initWorld() {
  const firstBody = Physics.createBody({
    position: { x: window.innerWidth / 2, y: 200 },
    speed: { x: 0, y: 0 },
  });
  const secondBody = Physics.createBody({
    position: { x: window.innerWidth / 2 + 400, y: 200 },
    speed: { x: 0, y: 0 },
  });
  const thirdBody = Physics.createBody({
    position: { x: window.innerWidth / 2 + 700, y: 200 },
    speed: { x: 0, y: 0 },
  });

  const firstConstraint = Physics.createStaticConstraint({
    position: firstBody.position,
    bodyId: firstBody.id,
  });
  const secondConstraint = Physics.createDistanceConstraint({
    firstBodyId: firstBody.id,
    secondBodyId: secondBody.id,
    distance: Vector.distance(firstBody.position, secondBody.position),
  });
  const thirdConstraint = Physics.createDistanceConstraint({
    firstBodyId: secondBody.id,
    secondBodyId: thirdBody.id,
    distance: Vector.distance(secondBody.position, thirdBody.position),
  });

  const world: Physics.World = {
    bodies: [firstBody, secondBody, thirdBody],
    constraints: [firstConstraint, secondConstraint, thirdConstraint],
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

      const substeps = 10;
      for (let i = 0; i < substeps; i++) {
        world = Physics.updateWorld(world, deltaTimeSeconds / substeps);
      }

      context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      Render.drawWorld(world, context);
    }
    lastFrameTime = time;
    window.requestAnimationFrame(animationFrame);
  };
  window.requestAnimationFrame(animationFrame);
}

main();
