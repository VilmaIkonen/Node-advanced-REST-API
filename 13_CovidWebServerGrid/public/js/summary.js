'use strict';

(function() {

  let inputfield;
  let cumulativeSpan;
  let dailySpan;

  document.addEventListener('DOMContentLoaded', init);

  function init(){
    inputfield = document.getElementById('isodate');
    cumulativeSpan = document.getElementById('cumulative');
    dailySpan = document.getElementById('daily');
    document.getElementById('send').addEventListener('click', update);
  }

  async function update() { // Checking of date/data validity is not here. Must be in real production app!

    const date = inputfield.value;
    try {
      const totalresult = await fetch(`http://localhost:4000/api/v1/cases/cumulative/${date}`, { mode: 'cors' });
      const total = await totalresult.json();
      
      const dailyresult = await fetch(`http://localhost:4000/api/v1/cases/daily/${date}`, { mode: 'cors' });
      const daily = await dailyresult.json();

      if(total.data) {
        cumulativeSpan.textContent = total.data;
      }
      else {
        cumulativeSpan.textContent = total.error;
      }
      dailySpan.textContent = daily;       
    } 
    catch (err) {
      console.log(err)
    }
  }
}) ();
