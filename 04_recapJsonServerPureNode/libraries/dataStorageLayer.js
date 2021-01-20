'use strict';

const path = require('path');

function createDataStorage(baseDir, config) {
    const libPath = path.join(baseDir, config.storageLibraries.folder);
    const {CODES, MESSAGES} = require(path.join(libPath, config.storageLibraries.errorCodes));
    const {initLayerFunctions} = require(path.join(libPath, config.storageLibraries.layerFunctions));
    const {
        getAllFromStorage, 
        getFromStorage, 
        deleteFromStorage,
        addToStorage,
        updateStorage
    } = initLayerFunctions(baseDir, config.storage);

    class Datastorage {
        //getter
        // const bookStorage = new Datastorage();
        //     ...
        // console.log(bookStorage.CODES)
        get CODES() {
            return CODES;
        }

        //methods
        getAll() {
            return getAllFromStorage();
        }

        get(key,value) {
            return new Promise(async (resolve, reject)=>{
                if(!value) {
                    reject(MESSAGES.NOT_FOUND(key,`<empty ${key}>`));
                }
                else{
                    const result = await getFromStorage(key,value);
                    if(result) {
                        resolve(result);
                    }
                    else {
                        reject(MESSAGES.NOT_FOUND(key,value));
                    }
                }
            });
        }

        remove(key,value) {
            return new Promise(async (resolve,reject)=>{
                if(key==undefined) {
                    reject(MESSAGES.PROGRAM_ERROR());
                } else if(value==undefined) {
                    reject(MESSAGES.NOT_FOUND(key,'<empty>'));
                } else {
                    if(await deleteFromStorage(key, value)) {
                        resolve(MESSAGES.DELETE_OK(key, value));
                    } else {
                        reject(MESSAGES.NOT_DELETED(key, value));
                    }
                }
            });
        }

        insert(key, resource){
            return new Promise(async (resolve,reject)=>{
                if(key==undefined || resource==undefined) {
                    reject(MESSAGES.PROGRAM_ERROR());
                } else if(await addToStorage(resource)){
                    resolve(MESSAGES.INSERT_OK(key, resource[key]));
                } else {
                    reject(MESSAGES.NOT_INSERTED());
                }

            })
        }

        update(key,value,resource) {
            return new Promise(async (resolve,reject)=>{
                if( key==undefined || 
                    value==undefined || 
                    resource==undefined){
                        reject(MESSAGES.PROGRAM_ERROR());
                } else if(await getFromStorage(key,value)){
                    if(await updateStorage(key,resource)) {
                        resolve(MESSAGES.UPDATE_OK(key,value))
                    }
                    else{
                        reject(MESSAGES.NOT_UPDATED());
                    }
                } else if(await addToStorage(resource)){
                    resolve(MESSAGES.INSERT_OK(key,value));
                }else {
                    reject(MESSAGES.NOT_INSERTED());
                }
            });
        }

    }; //end of class

    return new Datastorage();
}

module.exports = {createDataStorage};
