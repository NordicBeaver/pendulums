import { Vector } from './vector';

export namespace Physics {
  export type Body = {
    id: string;
    position: Vector.Vector;
    speed: Vector.Vector;
  };

  export type StaticConstraint = {
    id: string;
    position: Vector.Vector;
    bodyId: string;
  };

  export type World = {
    bodies: Body[];
    constraints: StaticConstraint[];
    gravity: Vector.Vector;
  };

  export function createBody(props: Omit<Body, 'id'>) {
    const body: Body = { id: crypto.randomUUID(), ...props };
    return body;
  }

  export function createStaticConstraint(props: Omit<StaticConstraint, 'id'>) {
    const constraint: StaticConstraint = { id: crypto.randomUUID(), ...props };
    return constraint;
  }

  export function updateWorld(world: World, deltaTime: number) {
    let nextBodies = world.bodies.map((body) => {
      const nextPosition = Vector.add(body.position, Vector.scale(body.speed, deltaTime));
      const nextSpeed = Vector.add(body.speed, Vector.scale(world.gravity, deltaTime));
      const nextBody: Body = { ...body, position: nextPosition, speed: nextSpeed };
      return nextBody;
    });

    world.constraints.forEach((constraint) => {
      const body = nextBodies.find((b) => b.id === constraint.bodyId);
      if (!body) {
        return;
      }

      const bodyConstrained: Body = { ...body, position: constraint.position };
      nextBodies = [...nextBodies.filter((b) => b.id !== body.id), bodyConstrained];
    });

    const nextWorld: World = { ...world, bodies: nextBodies };
    return nextWorld;
  }
}
