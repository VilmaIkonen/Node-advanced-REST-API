'use strict';

const mariadb = require('mariadb');
const Database = require('./database');

module.exports = class TransactionDatabase extends Database {
  // all that is defined in database.js can be used here ('extends') / super: calls Database class's constructor
  constructor(options) {
    super(options);
  }

  doTransaction(sqlStatementsArray) {
    return new Promise(async(resolve, reject) => {
      let connection;
      try {
        connection = await mariadb.createConnection(this.options);
        await connection.beginTransaction();
        const results = [];
        for(let query of sqlStatementsArray){
          results.push(await this.doQuery(query.sql, query.parameters, connection));
        }
        await connection.commit();
        resolve(results);
      } 
      catch (err) {
        if(connection) connection.rollback();
        reject('Rollback, ' + err);
      }
      finally {
        // connection needs to be cut, otherwise the connection might hinder other requests to database
        if(connection) connection.end();
      }
    })
  }
}