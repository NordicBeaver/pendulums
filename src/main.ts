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
}

main();
