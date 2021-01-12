'use strict';

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

  return { getAllFromStorage, getFromStorage };
};

// end of init function

module.exports = {initLayerFunctions};
