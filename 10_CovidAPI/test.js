const covidData = require('./FIN.json');

const dateStrings = Object.keys(covidData.result) 
const data = dateStrings.map(date => covidData.result[date].confirmed)  
const data2 = Object.values(covidData.result);
const tmp = data2.map(value => value.confirmed);

console.log(dateStrings);
console.log(data);
console.log(data2);
console.log(tmp);

const dailyCases = [];
for (let i=0; i<data.length-1; i++) {
  dailyCases.push(data[i+1]-data[i]); // next - previous data
}
console.log(dailyCases);  // --> data now in mixed order. Go through data and take max to calculate pixel ratio

console.log(Math.max(...dailyCases));
