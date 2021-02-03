'use strict';

(function (){

  let startfield ;
  let endfield;

  document.addEventListener('DOMContentLoaded', init);

  function init() {
    // 'handles' for different elements that are needed:
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
      // array of objects, like: 
      // [{date: "2021-01-01", confirmed: 36403}, {date: "2021-01-02", confirmed: 36603}], go through array with for-loop or map:

      // const cumulativeCases = [];
      // for(let dailyData of data) {
      //   cumulativeCases.push(dailyData.confirmed); // --> array of numbers which can be charted:
      // }

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

})();