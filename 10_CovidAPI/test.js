const covidData = require('./FIN.json');

const dateStrings = Object.keys(covidData.result) 
const data = dateStrings.map(date => covidData.result[date].confirmed)  
const data2 = Object.values(covidData.result);
const tmp = data2.map(value => value.confirmed)

console.log(dateStrings);
console.log(data);
console.log(data2);
console.log(tmp);