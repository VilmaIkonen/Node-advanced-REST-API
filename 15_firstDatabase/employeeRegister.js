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

function printEmployee(employee) {
  console.log(`${employee.employeeId}: ${employee.firstname} ${employee.lastname}, Dept. ${employee.department} (${employee.salary} €)`);
}

function printAllEmployees(employees) {
  for(let employee of employees) {
    printEmployee(employee);
  }
}

async function getAll() {
  try {
    const result = await db.doQuery('select * from employee');
    if(result.resultSet) {
      printAllEmployees(result.queryResult);
    }
  }
  catch (err) {
    console.log(err);
  }
}

async function get(employeeId) {
  try {
    const result = await db.doQuery('select * from employee where employeeId=?', [employeeId]);
    if(result.resultSet) {
      if(result.queryResult.length >0) {
        printEmployee(result.queryResult[0]);
      }
      else {
        console.log(`Employee ${employeeId} not found`);
      }
    }
  }
  catch (err){
    console.log(err)
  }
}

async function insert(employee) {
  // create array of values ('+' will change string to number):
  const parameters = [
    +employee.employeeId,
    employee.firstname,
    employee.lastname,
    employee.department,
    +employee.salary
  ]; 
  try {    
  const sql = 'insert into employee values(?, ?, ?, ?, ?)'
  const status = await db.doQuery(sql, parameters);
  console.log('Status', status); 
  }
  catch(err) {
    console.log(err);
  }
}

async function remove(employeeId) {
  try {
    const sql = 'delete from employee where employeeId=?'
    const status = await db.doQuery(sql, [+employeeId]);
    console.log('Remove status', status)    
  }
  catch (err){
    console.log(err)
  }
}

async function update(employee) {
  try {
    const parameters = [
      employee.firstname,
      employee.lastname,
      employee.department,
      +employee.salary,
      +employee.employeeId // id as last because in sql query 'id' is queried as last in 'where'
    ];

    const sql = 'update employee set firstname=?, lastname=?, department=?, salary=? where employeeId=?' // sql query determines order of the values in the array!
    const status = await db.doQuery(sql, parameters);
    console.log('Update status ', status);
  }
  catch(err) {
    console.log(err);
 }}

 module.exports = { getAll, get, insert, remove, update };
