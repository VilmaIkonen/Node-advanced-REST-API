# Database API
This database class is a general purpose class for creating and using mariadb/mysql databases. It uses mariadb-library (as dependency, `npm install mariadb`).

This layer is used between database engine and our application.

## Constructor
The constructor is given all necessary information needed to open database connection as json object.
(port is not the server port but the mariadb port)

eg. 
```json
{
  "host": "localhost",
  "port": 3306,
  "user": "zeke",
  "password": "secret",
  "database": "employeedb"
}
```
## Methods:
### doQuery(sql, parameters, connection)
This method queries the database engine. 
Parameters:
- sql
  - sql-statement string
- parameters
  - parameters for sql statement (values) as an array
- connection
  - optional, used in transactions

#### Usage, select:
eg. 
```js
const result = await db.doQuery('select * from employee');
```
Query criterion is employeeId=1
```js
const result = await db.doQuery('select * from employee where empoyeeId=?',[1]);
```
? is a placeholder --> sql to database engine will be
```sql
select * from employee where empoyeeId=1;
```
return value is an object with two fields (eg.)
```json
{
  "queryResult": [
    {
      "employeeId": 1,
      "firstname": "Matt",
      "lastname": "River",
      "department": "ict",
      "salary": 4000
    }
  ],
  "resultSet": true
}
```
#### Usage, insert, delete or update:
Return status object
```json
{
  "queryResult": 
  {
    "rowsChanged": 1,
    "insertedId": 0,
    "status": 0
  },
  "resultSet": false
}
```
- rowsChanged: how many rows were affected

# Transactions
## **doTransaction(sqlStatementsArray)**
### sqlStatementArray
The format of the array is 
```json
[
  {sql: statement, parameters: []},
  {sql: statement, parameters: []},
  {sql: statement, parameters: []}
  ...
]
```
### Example
```js
[
  {sql: 'select * from employee', parameters: []},
  {sql: 'insert into employee values(?, ? ,?, ?, ?)', parameters:[200, 'Peter', 'Bond', 'serc', 8000]}
]