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

app.route(`${resource}/:value`)
    .get((req,res)=>{
        const value = req.params.value;
        dataStorage.get(key,value)
            .then(resource=>res.json(resource))
            .catch(error => res.json(error));
    })
    .delete((req,res)=>{
        const value = req.params.value;
        dataStorage.remove(key,value)
            .then(status => res.json(status))
            .catch(error => res.json(error));
    })
    .put((req,res)=>{
        if(!req.body) return res.sendStatus(500);
        const value=req.params.value;
        dataStorage.update(key,value,req.body)
            .then(status=>res.json(status))
            .catch(error=>res.json(error));
    });

app.post(resource, (req,res) =>{
    if(!req.body) return res.sendStatus(500);
    dataStorage.insert(key,req.body)
        .then(status=>res.json(status))
        .catch(error=>res.json(error));
});
server.listen(port,host, ()=>console.log(`Server ${host} is serving at port ${port}`));