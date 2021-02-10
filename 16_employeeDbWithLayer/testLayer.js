'use strict';

const DataLayer = require('./datastorageLayer');

const db = new DataLayer();

// Tests for getAll():

// db.getAll().then(console.log).catch(console.log);

(async () => {
  try {
    for(let emp of await db.getAll()){
      console.log(emp);
    }

    console.log('###############');
    let emp = await db.get(1);
    console.log(emp);

    console.log('###############');
    emp = await db.get(12);
    console.log(emp);

    console.log('###############')
    let employee = {
      employeeid: 123,
      firstname: 'Vera',
      lastname: 'River',
      department: 'ICT',
      salary: 5000
    };

    console.log('###############');
    console.log(await db.get(123));
    employee = {
      employeeid: 123,
      firstname: 'VeraX',
      lastname: 'RiverX',
      department: 'ICTX',
      salary: 5000
    };
    console.log(await db.update(employee));
    console.log(await db.get(123));
    console.log('###############');

    console.log(await db.insert(employee));
    console.log(await db.remove(13));
    console.log(await db.remove(123));
    console.log(await db.remove(14));
  }
  catch(err) {
    console.log(err);
  }
})