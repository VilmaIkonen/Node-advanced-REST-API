'use strict';

const fs = require('fs').promises;

async function readStorage(storageFile) {
  try {
    const data = await fs.readFile(storageFile, 'utf8');
    return JSON.parse(data);

  } catch (error) {
    return [];
  }
}

async function writeStorage(storageFile, data) {
  try {
    await fs.writeFile(storageFile, JSON.stringify(data, null, 4), {
      encoding: 'utf8', 
      flag: 'w' // 'write' flag, overwrites earlier version
    });
    return true;
  } 
  catch (err) {
    return false;    
  }
}

module.exports = { readStorage }