import { Physics } from './physics';

export namespace Render {
  export function drawWorld(world: Physics.World, context: CanvasRenderingContext2D) {
    world.bodies.forEach((body) => {
      context.beginPath();
      context.arc(body.position.x, body.position.y, 20, 0, 2 * Math.PI);
      context.fill();
    });
  }
}
