import './style.css';

function main() {
  const mainCanvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
  mainCanvas.width = window.innerWidth;
  mainCanvas.height = window.innerHeight;

  const context = mainCanvas.getContext('2d');
  if (!context) {
    console.error('Failed to create a 2d context');
    return;
  }

  const circlePosition = { x: 100, y: 100 };
  const circleSpeed = 100;

  let lastFrameTime: number | null = null;

  const animationFrame = (time: number) => {
    if (lastFrameTime) {
      const deltaTime = time - lastFrameTime;
      const deltaTimeSeconds = deltaTime / 1000;

      circlePosition.y += deltaTimeSeconds * circleSpeed;

      context.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
      context.beginPath();
      context.arc(circlePosition.x, circlePosition.y, 20, 0, 2 * Math.PI);
      context.stroke();
    }
    lastFrameTime = time;
    window.requestAnimationFrame(animationFrame);
  };
  window.requestAnimationFrame(animationFrame);
}

main();
