'use strict';

const fs = require('fs').promises;

async function readStorage(storageFile) {
    try{
        const data = await fs.readFile(storageFile, 'utf8');
        return JSON.parse(data);
    }
    catch(err) {
        return [];
    }
}

module.exports = {readStorage}