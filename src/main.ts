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

  context.beginPath();
  context.arc(100, 100, 20, 0, 2 * Math.PI);
  context.stroke();

  let lastFrameTime: number | null = null;
  function animationFrame(time: number) {
    if (lastFrameTime) {
      const deltaTime = time - lastFrameTime;
      console.log('Animation frame', deltaTime);
    }
    lastFrameTime = time;
    window.requestAnimationFrame(animationFrame);
  }
  window.requestAnimationFrame(animationFrame);
}

main();
