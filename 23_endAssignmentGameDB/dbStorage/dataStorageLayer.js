'use strict';

const Database = require('./database');
const options = require('./databaseOptions.json')
const sql = require('./sqlStatements.json');
const {toArrayUpdate, toArrayInsert} = require('./parameters');
const {CODES, MESSAGES} = require('../statusCodes');

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

  get(number) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await this.db.doQuery(getSql, [+number]); // gets data based on number
        if(result.queryResult.length >0) {
          resolve(result.queryResult[0]); // first item where number requirement met (the only item...)
        }
        else {
          resolve(MESSAGES.NOT_FOUND(PRIMARY_KEY, number));
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

  remove(number) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = this.db.doQuery(removeSql, [+number]);
        if(result.queryResult.rowChanged === 1) {
          resolve(MESSAGES.DELETE_OK(PRIMARY_KEY, number));
        }
        else {
          resolve(MESSAGES.NOT_DELETED(PRIMARY_KEY, number));
        }
      } 
      catch (err) {
        reject(MESSAGES.PROGRAM_ERROR());
      }
    })
  }
}

