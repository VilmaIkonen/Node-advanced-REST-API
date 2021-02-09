'use strict';

const Database = require('./database.js');

const options = {
  host: 'localhost',
  port: 3306,
  user: 'zeke',
  password: 'secret',
  database: 'employeedb'
};

const db = new Database(options);

//--> node firstTest.js (mariadb connection has to be open in the same time)

// db.doQuery('select * from employee')
// .then(console.log)
// .catch(console.log);

// await command must be wrapped inside an async function:
(async () => {
  try {
    const result = await db.doQuery('select * from employee');
    if(result.resultSet) {
      for(let employee of result.queryResult) {
        console.log(`${employee.employeeId}: ${employee.firstname} ${employee.lastname}, Dept. ${employee.department} (${employee.salary} €)`);
      }
    }
    let status = await db.doQuery('insert into employee values(?, ?, ?, ?, ?)', [3, 'Vera', 'River', 'Admin', 5000]);
    console.log(status);
  }
  catch (err) {
    console.log(err)
  }
})();

// (async () => {
//   try {
//     const result = await db.doQuery('select * from employee where employeeId=?', [2]);
//     if(result.resultSet) {
//       for(let employee of result.queryResult) {
//         console.log(`${employee.employeeId}: ${employee.firstname} ${employee.lastname}, Dept. ${employee.department} (${employee.salary} €)`);
//       }
//     }
//   }
//   catch (err) {
//     console.log(err)
//   }
// })();




