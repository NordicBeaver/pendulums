import './style.css';

type Vector = {
  x: number;
  y: number;
};

function add(vector1: Vector, vector2: Vector) {
  const result: Vector = { x: vector1.x + vector2.x, y: vector1.y + vector2.y };
  return result;
}

function scale(vector: Vector, scalar: number) {
  const result: Vector = { x: vector.x * scalar, y: vector.y * scalar };
  return result;
}

type Body = {
  position: Vector;
  speed: Vector;
};

type World = {
  bodies: Body[];
  gravity: Vector;
};

function initWorld() {
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

function updateWorld(world: World, deltaTime: number) {
  const nextBodies = world.bodies.map((body) => {
    const nextPosition = add(body.position, scale(body.speed, deltaTime));
    const nextSpeed = add(body.speed, scale(world.gravity, deltaTime));
    const nextBody: Body = { ...body, position: nextPosition, speed: nextSpeed };
    return nextBody;
  });
  const nextWorld: World = { ...world, bodies: nextBodies };
  return nextWorld;
}

function drawWorld(world: World, context: CanvasRenderingContext2D) {
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

  let world = initWorld();

  let lastFrameTime: number | null = null;
  const animationFrame = (time: number) => {
    if (lastFrameTime) {
      const deltaTime = time - lastFrameTime;
      const deltaTimeSeconds = deltaTime / 1000;

      world = updateWorld(world, deltaTimeSeconds);

      context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      drawWorld(world, context);
    }
    lastFrameTime = time;
    window.requestAnimationFrame(animationFrame);
  };
  window.requestAnimationFrame(animationFrame);
}

main();
