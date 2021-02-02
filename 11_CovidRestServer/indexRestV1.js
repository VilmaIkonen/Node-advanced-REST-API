'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const {writeStorage} = require('./jsonReaderWriter.js');
const { dateToIsoDate, isoDateNow, addDays, addOneDay  } = require('./datelibrary')

const covidDataFile = path.join(__dirname, './FIN.json');
let covidData = require(covidDataFile); // const --> let: as needs update
const { port, host, countryCode } = require('./config.json');
const {error} = require('console');

// ############ Data update START ############

function checkUpdate() { 
  return false; //covidData.lastupdate != isoDateNow(); // if same date, no update, if not, update.
  // in testing phase 'return false' used. When update needed, go to localhost:4000/api/v1/cases and change 'false' --> 'true'
}

function updateCovidData() {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch(`https://covidapi.info/api/v1/country/${countryCode}`);
      const data = await result.json();
      data.lastupdate = isoDateNow();
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
// Remember to give endpoint descriptive and short names

app.get('/api/v1/cases/cumulative', async(req, res) => {

  // First check if data needs update
  if(checkUpdate()) {
    covidData = await updateCovidData();
  }

  const dateStrings = Object.keys(covidData.result) // keys in result are the dates in json file
  const data = dateStrings.map(date => covidData.result[date].confirmed) // get number of confirmed cases from the array
  res.json(data);
})

app.get('/api/v1/cases/daily', async(req, res) => {

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

// daily cases for selected interval --> array
app.get('/api/v1/cases/daily/interval/:begindate/:enddate', (req, res) => {});

// cumulative cases until selected date 
app.get('/api/v1/cases/cumulative/:enddate', (req, res) => {});

// cases for a single date
app.get('/api/v1/cases/daily/:date', (req, res) => {});

// ############ Endpoints END ############ //

server.listen(port, host, () => console.log(`Server running at ${host} in port ${port}`))