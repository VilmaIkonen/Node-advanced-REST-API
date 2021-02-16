// Compared to 15_firstDatabase/employeeRegister, console.log and 'prints' will be replaced here with resolve/reject.

'use strict';

const Database = require('./database.js');

// SQL statements:
const getAllSql = 'select employeeId, firstname, lastname, department, salary from employee';
const getSql = 'select employeeId, firstname, lastname, department, salary where employeeId=?';
const insertSql = 'insert into employee (firstname, lastname, department, salary, employeeId) values (?, ?, ?, ?, ?)';
const updateSql = 'update employee set firstname=?, lastname=?, department=?, salary=? where employeeId=?';
const removeSql = 'delete from employee where employeeId=?';

// Same order as in 'insertSql' and 'updateSql':
const parameters =  employee => [
  employee.firstname,
  employee.lastname,
  employee.department,
  +employee.salary,
  +employee.employeeId
];

// This and sql statements could be required also from json-file:
const DEFAULT_OPTIONS = {
  host: 'localhost',
  port: 3306,
  user: 'zeke',
  password: 'secret',
  database:'employeedb'
}

module.exports = class EmployeeDb {

  constructor(options = DEFAULT_OPTIONS) {
    this.db = new Database(options); // Create new db with given options
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getAllSql);
        resolve(result.queryResult);
      }
      catch(err) {
        reject(err);
      }
    });
  }

  get(employeeId) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getSql, [+employeeId]); 
        if(result.queryResult.length >0) {
          resolve(result.queryResult[0])
        }
        else {
          resolve(`Employee ${employeeId} not found`) // can be resolved with text, object... whatever
        }         
      }
      catch(err){
        reject(err);
      }
    });
  }

  insert(employeeId) {
    return new Promise(async (resolve, reject) => {
      try {
        const status = await this.db.doQuery(insertSql, parameters(employee)) // returns array of parameters
        if(status.queryResult.rowsChanged === 1) {
          resolve('Insert OK');
        }
        else {
          resolve('Not inserted');
        }
      }
      catch(err) {
        reject(err);
      }
    })
  }

  remove(employeeId) {
    return new Promise(async (resolve, reject) => {
      try {
        const status = await this.db.doQuery(removeSql, [+employeeId]);
        if(status.queryResult.rowsChanged === 1) {
          resolve('Remove OK') 
        }
        else {
          resolve(`EmployeeId ${employeeId} was not removed`);
        }
      }
      catch(err) {
        reject(err);
      }
    })
  }

  update(employee) {
    return new Promise(async (resolve, reject) => {
      try {
        const status = await this.db.doQuery(updateSql, parameters(employee));
        if(status.queryResult.rowsChanged === 1) {
          resolve('Update OK')
        }
        else {
          resolve(`EmployeeId ${employeeId} was not updated`);
        }
      }
      catch(err) {
        reject(err);
      }
    })

  }
}
