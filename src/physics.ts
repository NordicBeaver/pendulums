import { Vector } from './vector';

export namespace Physics {
  export type Body = {
    position: Vector.Vector;
    speed: Vector.Vector;
  };

  export type World = {
    bodies: Body[];
    gravity: Vector.Vector;
  };

  export function updateWorld(world: World, deltaTime: number) {
    const nextBodies = world.bodies.map((body) => {
      const nextPosition = Vector.add(body.position, Vector.scale(body.speed, deltaTime));
      const nextSpeed = Vector.add(body.speed, Vector.scale(world.gravity, deltaTime));
      const nextBody: Body = { ...body, position: nextPosition, speed: nextSpeed };
      return nextBody;
    });
    const nextWorld: World = { ...world, bodies: nextBodies };
    return nextWorld;
  }
}
