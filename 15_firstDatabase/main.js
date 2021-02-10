'use strict';

const { getAll, get, insert, remove, update } = require('./employeeRegister')

runMain();  // will call runMain() which will call all other functions

// ### Functions ### //

async function runMain() {
  // all functions are run here:
  await getAll();
  console.log('###############');
  await get(1);
  console.log('###############');
  await get(12);
  console.log('###############');
  await insert({
    employeeId: 3,
    firstname: 'Kalle',
    lastname: 'Mountain',
    department: 'Sales',
    salary: 4500
  });
  console.log('###############');
  await getAll();
  console.log('###############');
  await update({ // when calling the function, the order of values does not matter! (see below in update())
    employeeId: 3,
    firstname: 'Kallex',
    lastname: 'Mountainx',
    department: 'Salesx',
    salary: 4500
  });
  console.log('###############');
  await remove(3);
  console.log('###############');
  await getAll();
  console.log('###############');
}
