'use strict';

// Everything inside Class!

class Test {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }

  // method
  result() {
    return `${this.b}: ${this.a}`;
  }

  newValues(a, b) {
    this.a = a;
    this.b = b;
  }

  // getter
  get data() {
    return this.a+this.b;
  }

  // setter
  set value(number) {
    this.a = number;
  }
}

const obj = new Test(123, 'abc');

console.log(obj);
console.log(obj.a);
console.log(obj.b);
/* -->
Test { a: 123, b: 'abc' }
123
abc 
*/

console.log(obj.result());
/* -->
abc: 123
*/

console.log(obj.data);
/* -->
123abc
*/

const objB = new Test(123, 456);
console.log(objB.data);
/* -->
579
*/

objB.value = 1000;
console.log(objB.result());
/* -->
456: 1000
*/

objB.newValues(2000, 3000);
console.log(objB.data);
/* -->
5000
*/


// ################################# //

class ExtendedTest extends Test {
  constructor(a, b, c){
    super (a, b);
    this.c = c;
  }
}

const test = new ExtendedTest(1, 2, 3);

console.log(test);
/* -->
ExtendedTest { a: 1, b: 2, c: 3 }
*/

console.log(test.data);
/* -->
3
because above:
  get data() {
    return this.a+this.b;
  }
*/

console.log(test.result());
/* -->
2: 1
because above:
  result() {
    return `${this.b}: ${this.a}`;
  }
*/ 

console.log(test.result());
/* -->
2: 1
because above:
  result() {
    return `${this.b}: ${this.a}`;
  }
*/ 
