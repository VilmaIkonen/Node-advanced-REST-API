'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');

const covidData = require('./FIN.json');
const { port, host } = require('./config.json');

const app = express();
const server = http.createServer(app);

const homePath = path.join(__dirname, 'home.html');

app.use(cors());

app.get('/', (req, res) => res.sendFile(homePath));

app.get('/api/v1/data', async(req, res) => {
  const dateStrings = Object.keys(covidData.result) // keys in result are the dates in json file
  const data = dateStrings.map(date => covidData.result[date].confirmed) // get number of confirmed cases from the array
  res.json(data);
})
