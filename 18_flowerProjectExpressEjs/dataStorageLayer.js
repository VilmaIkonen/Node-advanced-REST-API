'use strict';

const Database = require('./database');
const options = require('./databaseOptions.json')
const sql = require('./sqlStatements.json');
const {toArray} = require('./parameters');

// sql statements in separate file just for better readability
const getAllSql = sql.getAll.join(' ');
const getSql = sql.get.join(' ');
const insertSql = sql.insert.join(' ');
const updateSql = sql.update.join(' ');
const removeSql = sql.remove.join(' ');

// console.log(getAllSql);
// console.log(getSql);
// console.log(insertSql);
// console.log(updateSql);
// console.log(removeSql);

module.exports = class Datastorage {
  
  constructor() {
    this.db = new Database(options);
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getAllSql);
        resolve(result.queryResult);  
      } 
      catch (err) {
        reject(err)
      }
    })
  }

  get(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getSql, [+id]); // gets data based on id
        if(result.queryResult.length >0) {
          resolve(result.queryResult[0]); // first item where id requirement met (the only item...)
        }
        else {
          resolve({status: `Id ${id} not found`});
        }
      } 
      catch (err) {
        reject(err);
      }
    })
  }

  insert(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        const status = await this.db.doQuery(insertSql, toArray(resource));
        resolve({status: 'Insert OK'})
      } 
      catch (err) {
        reject(err);
      }
    })
  }

  update(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        const status = await this.db.doQuery(updateSql, toArray(resource));
        if(result.queryResult.rowsChanged === 0) {
          resolve({status: 'Not updated'})
        }
        else {
          resolve({status: 'Update OK'})
        }     
      } 
      catch (err) {
        reject(err);
      }
    })
  }

  remove(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = this.db.doQuery(removeSql, [+id]);
        if(result.queryResult.rowChanged === 1) {
          resolve({status: 'Remove OK'});
        }
        else {
          resolve({status: `Resourcewith id ${id} not removed`})
        }
      } 
      catch (err) {
        reject(err)
      }
    })
  }
}

