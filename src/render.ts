import { Physics } from './physics';

export namespace Render {
  export function drawWorld(world: Physics.World, context: CanvasRenderingContext2D) {
    context.save();
    context.beginPath();
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.restore();

    world.bodies.forEach((body) => {
      context.save();
      context.fillStyle = '#BC0EF1';
      context.beginPath();
      context.arc(body.position.x, body.position.y, 20, 0, 2 * Math.PI);
      context.fill();
      context.restore();

      context.save();
      context.strokeStyle = '#43F10E';
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(body.position.x, body.position.y);
      context.lineTo(body.position.x + body.speed.x / 2, body.position.y + body.speed.y / 2);
      context.stroke();
      context.restore();
    });

    world.constraints.forEach((constraint) => {
      if (constraint.type === 'distance') {
        const firstBody = world.bodies.find((b) => b.id === constraint.firstBodyId);
        const secondBody = world.bodies.find((b) => b.id === constraint.secondBodyId);
        if (!firstBody || !secondBody) {
          return;
        }

        context.save();
        context.beginPath();
        context.strokeStyle = '#BC0EF1';
        context.lineWidth = 5;
        context.moveTo(firstBody.position.x, firstBody.position.y);
        context.lineTo(secondBody.position.x, secondBody.position.y);
        context.stroke();
        context.restore();
      }
    });
  }
}
