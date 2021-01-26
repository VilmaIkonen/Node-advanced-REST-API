document.addEventListener('DOMContentLoaded', init);

function init() {
  fetch('/json')
  .then(result => result.json())
  .then(data => drawAllBars(data))
  .catch(err => console.log(err));
}

function drawAllBars(data) {
  let drawingCanvas = document.getElementById('drawingcanvas');
  let ctx = drawingCanvas.getContext('2d');

  ctx.translate(10, 150);
  ctx.fillStyle = 'teal';
  ctx.scale(1.2, 1.2);
  
  // if let=0 --> the total bar is also included
  for(let i = 1, x = 10; i < data.length; i++, x += 30) {
    drawBar(ctx, x, data[i]);
  }
}

function drawBar(ctx, x, data) {
  ctx.fillRect(x, -data.lukumäärä, 20, data.lukumäärä);
}