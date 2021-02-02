'use strict';
const { dateToIsoDate, isoDateNow, addDays } = require('./datelibrary')

// TESTS: 

console.log(addDays(dateToIsoDate(someDate), 2))

console.log(isoDateNow());

const test = new Date(Date.now());
const someDate = new Date('2020-06-12');
console.log(dateToIsoDate(someDate));

console.log(test.toISOString()); // --> 2021-01-27T12:50:57.101Z
console.log(test.toISOString().split('T')); // --> [ '2021-01-27', '12:50:57.101Z' ]

let [a, b] = test.toISOString().split('T');
console.log(a, ' ****** ', b); // --> 2021-01-27  ******  12:52:48.323Z

const [x, y, ...z] = [1,2,3,4,5,6,7];
console.log(x) // --> 1
console.log(y) // --> 2
console.log(z) // --> [ 3, 4, 5, 6, 7]

const [v, w, , ...t] = [1,2,3,4,5,6,7];
console.log(v) // --> 1
console.log(w) // --> 2
console.log(t) // --> [ 4, 5, 6, 7]

let u=2, i=3;
console.log(u,i); // --> 2 3
[u,i] = [i,u];
console.log(u,i); // --> 3 2