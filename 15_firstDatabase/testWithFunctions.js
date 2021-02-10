// this has been split into employeeRegister.js and main.js

// 'use strict';

// const Database = require('./database.js');

// const options = {
//   host: 'localhost',
//   port: 3306,
//   user: 'zeke',
//   password: 'secret',
//   database: 'employeedb'
// };

// const db = new Database(options);

// runMain();  // will call runMain() which will call all other functions

// // ### Functions ### //

// async function runMain() {
//   // all functions are run here:
//   await getAll();
//   console.log('###############');
//   await get(1);
//   console.log('###############');
//   await get(12);
//   console.log('###############');
//   await insert({
//     employeeId: 3,
//     firstname: 'Kalle',
//     lastname: 'Mountain',
//     department: 'Sales',
//     salary: 4500
//   });
//   console.log('###############');
//   await getAll();
//   console.log('###############');
//   await update({ // when calling the function, the order of values does not matter! (see below in update())
//     employeeId: 3,
//     firstname: 'Kallex',
//     lastname: 'Mountainx',
//     department: 'Salesx',
//     salary: 4500
//   });
//   console.log('###############');
//   await remove(3);
//   console.log('###############');
//   await getAll();
//   console.log('###############');
// }

// function printEmployee(employee) {
//   console.log(`${employee.employeeId}: ${employee.firstname} ${employee.lastname}, Dept. ${employee.department} (${employee.salary} €)`);
// }

// function printAllEmployees(employees) {
//   for(let employee of employees) {
//     printEmployee(employee);
//   }
// }

// async function getAll() {
//   try {
//     const result = await db.doQuery('select * from employee');
//     if(result.resultSet) {
//       printAllEmployees(result.queryResult);
//     }
//   }
//   catch (err) {
//     console.log(err);
//   }
// }

// async function get(employeeId) {
//   try {
//     const result = await db.doQuery('select * from employee where employeeId=?', [employeeId]);
//     if(result.resultSet) {
//       if(result.queryResult.length >0) {
//         printEmployee(result.queryResult[0]);
//       }
//       else {
//         console.log(`Employee ${employeeId} not found`);
//       }
//     }
//   }
//   catch (err){
//     console.log(err)
//   }
// }

// async function insert(employee) {
//   // create array of values ('+' will change string to number):
//   const parameters = [
//     +employee.employeeId,
//     employee.firstname,
//     employee.lastname,
//     employee.department,
//     +employee.salary
//   ]; 
//   try {    
//   const sql = 'insert into employee values(?, ?, ?, ?, ?)'
//   const status = await db.doQuery(sql, parameters);
//   console.log('Status', status); 
//   }
//   catch(err) {
//     console.log(err);
//   }
// }

// async function remove(employeeId) {
//   try {
//     const sql = 'delete from employee where employeeId=?'
//     const status = await db.doQuery(sql, [+employeeId]);
//     console.log('Remove status', status)    
//   }
//   catch (err){
//     console.log(err)
//   }
// }

// async function update(employee) {
//   try {
//     const parameters = [
//       employee.firstname,
//       employee.lastname,
//       employee.department,
//       +employee.salary,
//       +employee.employeeId // id as last because in sql query 'id' is queried as last in 'where'
//     ];

//     const sql = 'update employee set firstname=?, lastname=?, department=?, salary=? where employeeId=?' // sql query determines order of the values in the array!
//     const status = await db.doQuery(sql, parameters);
//     console.log('Update status ', status);
//   }
//   catch(err) {
//     console.log(err);
//  }}
