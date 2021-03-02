'use strict'

const DataStorage = require('./dataStorageLayer');

const db = new DataStorage();

db.getAll().then(console.log).catch(console.log);
db.get(1).then(console.log).catch(console.log);
db.get(100).then(console.log).catch(console.log);