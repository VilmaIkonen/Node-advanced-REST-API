'use strict';

const Database = require('./transactionDatabase');

const db = new Database({
  host: 'localhost',
  port: 8888,
  user: 'zeke',
  password: 'secret',
  database: 'employeedb'
});

const statements = [
  {sql: 'select * from employee', parameters: []},
  {sql: 'insert into employee values(?, ? ,?, ?, ?)', parameters:[200, 'Peter', 'Bond', 'serc', 8000]},
  {sql: 'select * from employee', parameters: []},
  {sql: 'insert into employee values(?, ? ,?, ?, ?)', parameters:[100, 'Betty', 'Smith', 'HR', 5000]},
  {sql: 'delete from employee where employeeId=?', parameters:[200]},
  {sql: 'select * from employee', parameters: []}
];

(async() => {
  try {
    const result = await db.doTransaction(statements);
    console.log(JSON.stringify(result, null, 4));
  } catch (err) {
    console.log(err)
  }
})();