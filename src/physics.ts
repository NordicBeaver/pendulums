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

  export function initWorld() {
    const firstBody: Body = {
      position: { x: 100, y: 500 },
      speed: { x: 300, y: -300 },
    };
    const secondBody: Body = {
      position: { x: 400, y: 500 },
      speed: { x: 300, y: -400 },
    };

    const world: World = {
      bodies: [firstBody, secondBody],
      gravity: { x: 0, y: 200 },
    };

    return world;
  }

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
