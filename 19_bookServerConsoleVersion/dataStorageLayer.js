'use strict';

const Database = require('./database');
const options = require('./databaseOptions.json')
const sql = require('./sqlStatements.json');
const {CODES, MESSAGES} = require('./statusCodes');
const {toArrayUpdate, toArrayInsert} = require('./parameters');

// sql statements in separate file just for better readability
const getAllSql = sql.getAll.join(' ');
const getSql = sql.get.join(' ');
const insertSql = sql.insert.join(' ');
const updateSql = sql.update.join(' ');
const removeSql = sql.remove.join(' ');
const PRIMARY_KEY = sql.primaryKey;

module.exports = class Datastorage {
  
  constructor() {
    this.db = new Database(options);
  }

  get CODES() {
    return CODES;
  }

  getAll() {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getAllSql);
        resolve(result.queryResult);  
      } 
      catch (err) {
        reject(MESSAGES.PROGRAM_ERROR())
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
          resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, id));
        }
      } 
      catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    })
  }

  insert(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        const status = await this.db.doQuery(insertSql, toArrayInsert(resource));
        resolve(MESSAGES.INSERT_OK(PRIMARY_KEY, resource[PRIMARY_KEY]))
      } 
      catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    })
  }

  update(resource) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(updateSql, toArrayUpdate(resource));
        if(result.queryResult.rowsChanged === 0) {
          resolve(MESSAGES.NOT_UPDATED());
        }
        else {
          resolve(MESSAGES.UPDATE_OK(PRIMARY_KEY, resource[PRIMARY_KEY]));
        }     
      } 
      catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    })
  }

  remove(id) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = this.db.doQuery(removeSql, [+id]);
        if(result.queryResult.rowChanged === 1) {
          resolve(MESSAGES.DELETE_OK(PRIMARY_KEY, id));
        }
        else {
          resolve(MESSAGES.NOT_DELETED(PRIMARY_KEY, id));
        }
      } 
      catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    })
  }
}

