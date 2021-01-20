'use strict';

(function() {

  let drawingCanvas;
  let ctx; // context
  document.addEventListener('DOMContentLoaded', init)

  function init() {
    drawingCanvas = document.getElementById('drawingcanvas');
    ctx = drawingCanvas.getContext('2d');
    drawRect(10, 10, 30, 50, 'red');
    ctx.fillRect(300,10,10,10);
    drawRect(100,100, 50, 50, 'green');
    ctx.fillRect(300,30,10,10);
    drawRect(200, 200, 50, 50,'orange', true);
  }

  function drawRect(x, y, width, height, fillColor, border = false) {

    ctx.save();
    ctx.fillStyle = fillColor;
    ctx.fillRect(x, y, width, height);
    if(border) {
      ctx.strokeStyle = 'black';
      ctx.strokeRect( x, y, width, height);
    }

    ctx.restore(); // restores color to default black
  }
}) ();