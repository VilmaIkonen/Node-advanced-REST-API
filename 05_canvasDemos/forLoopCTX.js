'use strict';

(function() {

  document.addEventListener('DOMContentLoaded', init)

  function init() {
    const drawingCanvas = document.getElementById('drawingcanvas');
    const ctxA = drawingCanvas.getContext('2d');

    const anotherCanvas = document.getElementById('anothercanvas');
    const ctxB = anotherCanvas.getContext('2d');

    const heights = [10, 40, 20, 70, 30];

    for(let i=0, x=10; i<5; i++, x+=50) {
      drawRect(ctxA, x, 400-heights[i], 40, heights[i], 'green');
      drawRect(ctxB, x, 0, 40, heights[i], 'red')

      ctxA.font = '12pt monospace'
      ctxA.fillText(heights[i], x+10, 400-heights[i]-5)
    } 
  }

  function drawRect(ctx, x, y, width, height, fillColor, border = false) {

    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
    if(border) {
      ctx.strokeStyle = 'black';
      ctx.strokeRect( x, y, width, height);
    }

    ctx.restore(); 
  }
}) ();