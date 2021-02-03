'use strict';

(function (){

  let startfield ;
  let endfield;
  let canvasarea;
  let CANVAS_WIDTH;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // 'handles' for different elements that are needed:
    canvasarea = document.getElementById('canvasarea');
    CANVAS_WIDTH = canvasarea.width;
    startfield = document.getElementById('startdate');
    endfield = document.getElementById('enddate');
    document.getElementById('send').addEventListener('click', update); 
  }

  async function update() {
    const startdate = startfield.value;
    const enddate = endfield.value;

    try {
      const result = await fetch(`http://localhost:4000/api/v1/cases/daily/interval/${startdate}/${enddate}`, {mode: 'cors'});

      const data = await result.json();
      const cumulativeCases = data.map(dailyData => dailyData.confirmed); // --> array of numbers which can be charted (data):

      drawChart(cumulativeCases);

    } 
    catch (error) {
      console.log(error);
    }

    function drawChart(data) {
      const canvasArea = document.getElementById('canvasarea');
      const ctx = canvasarea.getContext('2d');
      ctx.clearRect(0, 0, canvasArea.width, canvasArea.height) // for clearing the whole area before next draw 
      const barWidth = (canvasArea.width/data.length) -1; // calculate the canvasarea vs. data width
      drawBars(ctx, data, barWidth, canvasArea.height);
    }
  }

  function drawChart(data) {
    let ctx = canvasarea.getContext('2d');
    ctx.clearRect(0, 0, canvasarea.width, canvasarea.height);
    const maxData = Math.max(...data);
    const font = '14pt monospace';
    canvasArea.width = CANVAS_WIDTH + Grid.getLabelAreaWidth(ctx, maxData, font);

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
    
    grid.draw(ctx);
    const barWidth = (grid.drawingArea.width/data.length) -1;
    drawBars(ctx, data, barWidth, grid.drawingArea);
  }
})();