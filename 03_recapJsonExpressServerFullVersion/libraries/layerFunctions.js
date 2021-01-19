'use strict';

const { writeSync } = require('fs');
const path = require('path');

function initLayerFunctions(baseDir, config) {
  const storageFolder = path.join(baseDir, config.folder);
  const storageConfig = require(path.join(storageFolder, config.storageConfig));
  const storageFile = path.join(storageFolder, storageConfig.storageFile);
  const {readStorage} = require(path.join(storageFolder, storageConfig.readerWriter));

  async function getAllFromStorage() {
    return readStorage(storageFile);
  }

  async function getFromStorage(key, value) {
    return (await readStorage(storageFile))
      .find(resultObject => resultObject[key]==value) || null;
  }

  async function deleteFromStorage(key, value) {
    let storage = await readStorage(storageFile);
    const i = storage.findIndex(resource => resource[key] == value);
    if(i < 0) return false;
    storage.splice(i, 1); // take out ONE object starting from index i
    return await writeStorage(storageFile, storage);
  }

  async function addToStorage(resource) {
    const storage = await readStorage(storageFile);
    storage.push(resource);
    return await writeStorage(storageFile, storage);
  }
 
  async function updateStorage(key, resource) {  // key = eg. id, resource 0 object to update
    let storage = await readStorage(storageFile);
    const oldResource = storage.find(old => old[key] === resource[key]);

    if(oldResource) {
      Object.assign(oldResource, resource); // updating old object
      return await writeStorage(storageFile, storage);
    }
    return false;
  }

  return { getAllFromStorage, getFromStorage, deleteFromStorage, addToStorage, updateStorage };
};

// end of init function

module.exports = {initLayerFunctions};
