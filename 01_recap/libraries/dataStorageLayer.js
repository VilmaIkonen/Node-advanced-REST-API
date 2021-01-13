'use strict';

const { get } = require('http');
const path = require('path');

function createDataStorage(baseDir, config) {
  const libPath = path.join(baseDir, config.storageLibraries.folder);
  const { CODES, MESSAGES } = require(path.join(libPath, config.storageLibraries.errorCodes));
  const { initLayerFunctions } = require(path.join(libPath, config.storageLibraries.initLayerFunctions));
  const { getAllFromStorage, getFromStorage } = initLayerFunctions(baseDir, config.storage);
  
  class Datastorage {
    // getter (Example of using getter in testClass.js):
    get CODES() {
      return CODES;
    }

    // methods:
    getAll() {
      return getAllFromStorage();
    }
    get(key, value) {
      return new Promise(async (resolve, reject) => {
        if(!value) {
          reject(MESSAGES.NOT_FOUND(`<empty ${key}>`));
        }
        else {
          const result = await getFromStorage(key, value);
          if(result) {
            resolve(result);
          }
          else {
            reject(MESSAGES.NOT_FOUND(value));
          }
        }
      })
    }
  }
  // end of class
  return new Datastorage();
}

module.exports = { createDataStorage };