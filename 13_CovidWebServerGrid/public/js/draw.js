'use strict';
// this file changed compared to 12_webServer:

function drawBars(ctx, data, barWidth, area) {
  ctx.save();    
    // starting point for the bars:
    ctx.translate(area.x, area.y);
    ctx.fillStyle = 'red';    
    // Bar = 2px wide, gap 1px. start x from 0, increase by 3 = 1px wider than the bar
    for (let i=0, x=0; i<data.length; i++, x+=barWidth +1) {
      const bar = Math.floor(data[i] * area.ratioY);// next - previous data
      ctx.fillRect(x, -bar, barWidth, bar);
    }
  ctx.restore();
}

function drawCurve(ctx, data, lineSegmentLength, area) {
  ctx.save();
    ctx.beginPath();
    ctx.translate(area.x, area.y);
    ctx.scale(1, -1);
    ctx.moveTo(0, 0); 
    ctx.strokeStyle = 'black';

    for(let i=0, x=lineSegmentLength; i<data.length; i++, x+=lineSegmentLength) {
      ctx.lineTo(x, Math.floor(data[i] * area.ratioY));
    }

    ctx.stroke();
  ctx.restore();
}

function drawBarChart(data) {
  const canvasarea = document.getElementById('canvasarea');
  const ctx = canvasarea.getContext('2d');

  const maxData = Math.max(...data); // splits data array into separate values and Math.max returns max value
  const font = '14pt monospace';
  canvasarea.width = data.length * 3 + Grid.getLabelAreaWidth(ctx, maxData, font) // measures length and adjustment of the canvas area, how much data is there and how much space needed

  const area = {
    x: 0,
    y: canvasarea.height,
    width: canvasarea.width,
    height: 0.9 * canvasarea.height // 90% coverage
  };

  const options = {
    color: {axis: 'black', grid: 'lightgrey', text: 'black'},
    lineWidth: 1,
    font: font     
  };

  const grid = new Grid(area, options, maxData);

  // first draw grid, then bars:
  grid.draw(ctx);
  drawBars(ctx, data, 2, grid.drawingArea);
}

function drawLineChart(data) {
  const canvasarea = document.getElementById('canvasarea');
  const ctx = canvasarea.getContext('2d');

  const maxData = Math.max(...data); // splits data array into separate values and Math.max returns max value
  const font = '14pt monospace';
  canvasarea.width = data.length * 3 + Grid.getLabelAreaWidth(ctx, maxData, font) // measures length and adjustment of the canvas area, how much data is there and how much space needed

  const area = {
    x: 0,
    y: canvasarea.height,
    width: canvasarea.width,
    height: 0.9 * canvasarea.height // 90% coverage
  };

  const options = {
    color: {axis: 'black', grid: 'lightgrey', text: 'black'},
    lineWidth: 1,
    font: font     
  };

  const grid = new Grid(area, options, maxData);

  // first draw grid, then line:
  grid.draw(ctx);
  drawCurve(ctx, data, 3, grid.drawingArea);
}



