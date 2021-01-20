'use strict';
(function() {

  let drawingCanvas;
  let ctx;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    drawingCanvas = document.getElementById('drawingcanvas');
    ctx = drawingCanvas.getContext('2d');

    draw();
  }

  function draw(){

    ctx.translate(Math.floor(drawingCanvas.width/2), (Math.floor(drawingCanvas.width/2))); // calculation of middle point and putting it in the middle of canvas

    // ctx.fillRect(-5, -5, 10, 10); // center point, with small dot: (0, 0, 1, 1)
    
    ctx.moveTo(-drawingCanvas.width/2, 0);
    ctx.lineTo(drawingCanvas.width/2, 0);
    ctx.stroke();

    ctx.moveTo(0, -drawingCanvas.height/2);
    ctx.lineTo(0, drawingCanvas.height/2);
    ctx.stroke();

    ctx.font = '20pt sans serif'
    ctx.fillText('test', 0, 0);

    ctx.scale(1, -1);
    ctx.fillText('test2', 0, 0);

    ctx.scale(1, -1); // if repeated, the scaling will be converted back to original
    ctx.fillText('test3', 0, -30);

    ctx.beginPath(); 
    ctx.arc(-100, -50, 60, 0, 2*Math.PI);
    ctx.stroke();

    ctx.scale(1, 0.25);
    ctx.beginPath(); // ends the 'lineTo()' w/o there'll be a line from last circle to this one
    ctx.arc(100, 250, 60, 0, 2*Math.PI);
    ctx.stroke();  
  }

}) ();