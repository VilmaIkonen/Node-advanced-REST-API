'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');

const app = express();

const {port, host, activeStorage} = require('./mainServerConfig.json');
const baseDir = __dirname;

const {storage, storageLibraries} = require(path.join(baseDir,activeStorage));
const {createDataStorage} = 
    require(path.join(baseDir, storageLibraries.folder,storageLibraries.dataLayer));
    
const { resource, key } = require(path.join(baseDir,storage.folder,storage.storageConfig));
const dataStorage = createDataStorage(baseDir, {storage, storageLibraries});

const server = http.createServer(app);

app.use(express.json());
app.use(cors());

app.get(resource, (req,res)=> dataStorage.getAll().then(result=>res.json(result)));

app.get(`${resource}/:value`, (req,res)=>{
    const value = req.params.value;
    dataStorage.get(key,value)
        .then(book=>res.json(book))
        .catch(error => res.json(error));
});

app.delete(`${resource}/:value`, (req,res)=>{
    const value = req.params.value;
    dataStorage.remove(key,value)
        .then(status => res.json(status))
        .catch(error => res.json(error));
});

server.listen(port,host, ()=>console.log(`Server ${host} is serving at port ${port}`));