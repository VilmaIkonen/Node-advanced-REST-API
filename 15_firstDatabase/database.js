'use strict';

// only place where reference to mariadb dependency. If need to change to some other db, only change this file and install the dependency! (use names that are in that module, eg. in mysql or postgre documentation)
const mariadb = require('mariadb');

module.exports = class Database {

  // object that needs to be defined in the calling is in this constructor. comes from mariadb...?
  constructor(options) {
    this.options = options;
  }

  doQuery(sql, paramaters, connection) {
    return new Promise(async (resolve, reject) => {
      let newConnection = false; 
      try {
        // check if connection is available already. for transaction, false as default
        if(!connection) { 
          connection = await mariadb.createConnection(this.options);
          newConnection = true;
        }
        let queryResult = await connection.query(sql, parameters); // query of mariadb library
        if(typeof queryResult === 'undefined') { // this should not ever happen...
          reject('Query error');
        }
        else if (typeof queryResult.affectedRows === 'undefined') {
          delete queryResult.meta;
          resolve({queryResult, resultSet: true}); // same as: resolve({queryResult: queryResult, resultSet: true});
        }
        else {
          resolve({ // naming mariadb deafult values accorging our API description
            queryResult: {
              rowsAffected: queryResult.affectedRows,
              insertId: queryResult.insertId,
              status: queryResult.warningStatus 
            }
          })
        }
      }
      catch(err) {
        reject('Sql error ' + err.message)
      }
      finally {
        if(connection && newConnection) connection.end();
      }
    })    
  }
}
