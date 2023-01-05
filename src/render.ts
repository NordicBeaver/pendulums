import { Physics } from './physics';

export namespace Render {
  export function drawWorld(world: Physics.World, context: CanvasRenderingContext2D) {
    world.bodies.forEach((body) => {
      context.save();
      context.beginPath();
      context.arc(body.position.x, body.position.y, 20, 0, 2 * Math.PI);
      context.fill();
      context.restore();

      context.save();
      context.strokeStyle = '#00ff00';
      context.beginPath();
      context.moveTo(body.position.x, body.position.y);
      context.lineTo(body.position.x + body.speed.x, body.position.y + body.speed.y);
      context.stroke();
      context.restore();
    });
  }
}
