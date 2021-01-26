'use strict';

const data = require('./vantaaData.json');

const http = require('http');
const path = require('path');
const express = require('express');

const app = express();

const port = 3000;
const host = 'localhost';

const server = http.createServer(app);

// For testing the webpage, for now... :
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'vantaaJobsHome.html')));
app.get('/json', (req, res) => res.json(data));

server.listen(port, host, () => console.log(`Server ${host} running at port ${port}`));