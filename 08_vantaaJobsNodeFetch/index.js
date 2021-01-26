'use strict';

const http = require('http');
const path = require('path');
const express = require('express');

const fetch = require('node-fetch');
const cors = require('cors');

const port = 3000;
const host = 'localhost';

const app = express();
const server = http.createServer(app);
app.use(cors());

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'vantaaJobsHome.html')));

app.get('/json', (req, res) => fetch('http://gis.vantaa.fi/rest/tyopaikat/v1')
  .then(result => result.json())
  .then(data => res.json(data))
  .catch(err => console.log(err))
);

server.listen(port, host, () => console.log(`Server ${host} running at port ${port}`));