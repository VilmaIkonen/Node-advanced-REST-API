'use strict';

const http = require('http');
const path = require('path');
const express = require('express');

const app = express();

const {port, host, activeStorage} = require('./mainServerConfig.json');
const baseDir = __dirname;

const {storage, storageLibraries} = require(path.join(baseDir, activeStorage));
const {createDataStorage} = require(path.join(baseDir, storageLibraries.folder, storageLibraries.dataLayer));

const dataStorage = createDataStorage(baseDir, {storage, storageLibraries});

const server = http.createServer(app);

app.use(express.json());

// get all books
app.get('/api/books', (req, res) => dataStorage.getAll().then(result => res.json(result)));

app.get('/api/books/:id', (req, res) => {
  const bookId = req.params.id;
  dataStorage.get('bookID', bookId)
    .then(book => res.json(book))
    .catch(error => res.json(error));
})

server.listen(port, host, () => console.log(`Server ${host} is running in port ${port}`));

