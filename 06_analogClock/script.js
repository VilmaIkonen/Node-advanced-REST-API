'use strict';

(function() {

  let drawingCanvas;
  let ctx;
  let timer;
  let bgColor;
  let angleInRad;

  document.addEventListener('DOMContentLoaded', init);

  function init() {

    // First two are always defined with all canvases:
    drawingCanvas = document.getElementById('drawingcanvas');
    ctx = drawingCanvas.getContext('2d');

    bgColor = ctx.createRadialGradient(200, 200, 200, 200, 200, 50); // x, y, radius of bigger circle, x, y, radius of smaller circle
    bgColor.addColorStop(0.0, '#A9A9A9') // at 0%, green
    bgColor.addColorStop(0.5, '#C0C0C0') // at 50%, greenyellow
    bgColor.addColorStop(1.0, '#F8F8F8') // at 100%, lightgreen

    angleInRad = 0;
    timer = setInterval(draw, 1000) // timer will call draw function once/sec.
    draw();
  }

  function draw() {
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);

    ctx.save();
      ctx.translate(200, 200); // new "0, 0" point, center of the clock

      angleInRad += 6*Math.PI/180 // degrees to radiants

      ctx.rotate(angleInRad);

      ctx.fillStyle = '#505050';
      ctx.fillRect(0, -3, 200, 6); // -3 y --> center point to center as the width of the arm is 6
      ctx.strokeStyle = 'black';
      ctx.strokeRect(0, -3, 200, 6);

      ctx.save();
        ctx.font = '10pt monospace';
        ctx.strokeStyle = 'black';
        ctx.strokeText('Time is', 10, -7);
      ctx.restore();
      
      ctx.arc(0, 0, 10, 0, 2, 2*Math.PI)
      ctx.fill();
      ctx.stroke();
        
    ctx.restore(); 
  }
}) ();