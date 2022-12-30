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

function main() {
  const mainCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight;

  const context = mainCanvas.getContext('2d');
  if (!context) {
    console.error('Failed to create a 2d context');
    return;
  }

  let circlePosition: Vector = { x: 100, y: 500 };
  let circleSpeed: Vector = { x: 300, y: -300 };
  const gravity: Vector = { x: 0, y: 200 };

  let lastFrameTime: number | null = null;
  const animationFrame = (time: number) => {
    if (lastFrameTime) {
      const deltaTime = time - lastFrameTime;
      const deltaTimeSeconds = deltaTime / 1000;

      circlePosition = add(circlePosition, scale(circleSpeed, deltaTimeSeconds));
      circleSpeed = add(circleSpeed, scale(gravity, deltaTimeSeconds));

      context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      context.beginPath();
      context.arc(circlePosition.x, circlePosition.y, 20, 0, 2 * Math.PI);
      context.fill();
    }
    lastFrameTime = time;
    window.requestAnimationFrame(animationFrame);
  };
  window.requestAnimationFrame(animationFrame);
}

main();
