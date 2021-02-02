'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const {writeStorage} = require('./jsonReaderWriter.js');

const covidDataFile = path.join(__dirname, './FIN.json');
let covidData = require(covidDataFile); // const --> let: as needs update
const { port, host, countryCode } = require('./config.json');
const {error} = require('console');

// ############ Data update START ############

function checkUpdate() {
  const [isoDate, ] = new Date(Date.now()).toISOString().split('T'); // Returns only date, not the time (.split('T')) w/o --> eg. 2021-01-27T12:50:05.456Z
  return false; //covidData.lastupdate != isoDate; // if same date, no update, if not, update.
}

function updateCovidData() {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch(`https://covidapi.info/api/v1/country/${countryCode}`);
      const data = await result.json();
      const [isoDate, ] = new Date(Date.now()).toISOString().split('T');
      data.lastupdate = isoDate;
      console.log('updated'); // just for debuging
      await writeStorage(covidDataFile, data);
      resolve(data);
    } 
    catch (err) {
      reject(new error(err. message))
    }
  })
}

// ############ Data update END ############

const app = express();
const server = http.createServer(app);

app.use(cors());

// ############ Endpoints START ############ //

app.get('/api/v1/data', async(req, res) => {

  // First check if data needs update
  if(checkUpdate()) {
    covidData = await updateCovidData();
  }

  const dateStrings = Object.keys(covidData.result) // keys in result are the dates in json file
  const data = dateStrings.map(date => covidData.result[date].confirmed) // get number of confirmed cases from the array
  res.json(data);
})

app.get('/api/v1/daily', async(req, res) => {

  // First check if data needs update
  if(checkUpdate()) {
    covidData = await updateCovidData();
  }

  const dateStrings = Object.keys(covidData.result) // keys in result are the dates in json file
  const data = dateStrings.map(date => covidData.result[date].confirmed) // get number of confirmed 
  const dailyCases = [];
  for (let i=0; i<data.length-1; i++) {
    dailyCases.push(data[i+1]-data[i]); // next - previous data
  }  
  res.json(dailyCases);
})

// ############ Endpoints END ############ //

server.listen(port, host, () => console.log(`Server running at ${host} in port ${port}`))