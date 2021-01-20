'use strict';

(function() {

  let drawingCanvas;
  let ctx; // context
  document.addEventListener('DOMContentLoaded', init)

  function init() {
    drawingCanvas = document.getElementById('drawingcanvas');
    ctx = drawingCanvas.getContext('2d');
    const heights = [10, 40, 20, 70, 30];

    // for(let i=0, x=10; i<5; i++, x+=50) {
    //   drawRect(x, 200, 40, heights[i], 'green')
    // } // Bars are facing now downwards

    for(let i=0, x=10; i<5; i++, x+=50) {
      drawRect(x, 200-heights[i], 40, heights[i], 'green')
      // Bars are facing now upwards
      // x+=50 --> gives 10px space between 40px wide bars
      ctx.font = '10pt monospace'
      ctx.fillText(heights[i], x+10, 200-heights[i]-5)
    } 
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