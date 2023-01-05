import { Vector } from './vector';

export namespace Physics {
  export type Body = {
    id: string;
    position: Vector.Vector;
    speed: Vector.Vector;
  };

  export type StaticConstraint = {
    id: string;
    type: 'static';
    position: Vector.Vector;
    bodyId: string;
  };

  export type DistanceConstraint = {
    id: string;
    type: 'distance';
    firstBodyId: string;
    secondBodyId: string;
    distance: number;
  };

  type Constraint = StaticConstraint | DistanceConstraint;

  export type World = {
    bodies: Body[];
    constraints: Constraint[];
    gravity: Vector.Vector;
  };

  export function createBody(props: Omit<Body, 'id'>) {
    const body: Body = { id: crypto.randomUUID(), ...props };
    return body;
  }

  export function createStaticConstraint(props: Omit<StaticConstraint, 'id' | 'type'>) {
    const constraint: StaticConstraint = { id: crypto.randomUUID(), type: 'static', ...props };
    return constraint;
  }

  export function createDistanceConstraint(props: Omit<DistanceConstraint, 'id' | 'type'>) {
    const constraint: DistanceConstraint = { id: crypto.randomUUID(), type: 'distance', ...props };
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
      if (constraint.type === 'static') {
        const body = nextBodies.find((b) => b.id === constraint.bodyId);
        if (!body) {
          return;
        }

        const bodyConstrained: Body = { ...body, position: constraint.position };
        nextBodies = [...nextBodies.filter((b) => b.id !== body.id), bodyConstrained];
      } else if (constraint.type === 'distance') {
        const firstBody = nextBodies.find((b) => b.id === constraint.firstBodyId);
        const secondBody = nextBodies.find((b) => b.id === constraint.secondBodyId);
        if (!firstBody || !secondBody) {
          return;
        }

        const distanceOffset = Vector.distance(firstBody.position, secondBody.position) - constraint.distance;
        const firstBodyAdjustDirection = Vector.normalize(Vector.subtract(secondBody.position, firstBody.position));
        const secondBodyAdjustDirection = Vector.normalize(Vector.subtract(firstBody.position, secondBody.position));
        const firstBodyAdjustment = Vector.scale(firstBodyAdjustDirection, distanceOffset / 2);
        const secondBodyAdjustment = Vector.scale(secondBodyAdjustDirection, distanceOffset / 2);

        const firstBodyPositionConstrained = Vector.add(firstBody.position, firstBodyAdjustment);
        const firstBodyConstrained: Body = { ...firstBody, position: firstBodyPositionConstrained };
        nextBodies = [...nextBodies.filter((b) => b.id !== firstBodyConstrained.id), firstBodyConstrained];

        const secondBodyPositionConstrained = Vector.add(secondBody.position, secondBodyAdjustment);
        const secondBodyConstrained: Body = { ...secondBody, position: secondBodyPositionConstrained };
        nextBodies = [...nextBodies.filter((b) => b.id !== secondBodyConstrained.id), secondBodyConstrained];
      }
    });

    const nextWorld: World = { ...world, bodies: nextBodies };
    return nextWorld;
  }
}
