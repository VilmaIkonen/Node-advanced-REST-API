// This js-file feeds data through the end points that are defined here.
'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const {writeStorage} = require('./jsonReaderWriter.js');
const { dateToIsoDate, isoDateNow, addDays, addOneDay  } = require('./datelibrary')

const covidDataFile = path.join(__dirname, './FIN.json');

let covidData = require(covidDataFile); // data red when the server is started (or re-started...)

const { port, host, countryCode } = require('./config.json');

// ############ Data update START ############

function checkUpdate() { 
  return false; // in testing phase 'return false' used. When update needed, go to localhost:4000/api/v1/cases and change 'false' --> 'true'
  //covidData.lastupdate != isoDateNow(); // if same date, no update, if not, update.
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

// ############ Endpoints START ############ (Remember to give endpoint descriptive and short names) //

app.get('/api/v1/cases/cumulative', async(req, res) => {

  // First check if data needs update
  if(checkUpdate()) {
    covidData = await updateCovidData();
  }

  const dateStrings = Object.keys(covidData.result) // keys in result are the dates in json file
  const data = dateStrings.map(date => covidData.result[date].confirmed) // get number of confirmed cases from the array
  res.json(data);
});

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
});

// Return an array of objects like {date: "2021-01-01", confirmed: 36403}, between selected time interval. 'begindate' and 'enddate' in ISO format.
app.get('/api/v1/cases/daily/interval/:begindate/:enddate', async(req, res) => {
  
  // First check if data needs update
  if(checkUpdate()) {
    covidData = await updateCovidData();
  }

  const beginISO = req.params.begindate;
  const endISO = req.params.enddate;
  const cases = [];

  for(let date= beginISO; date <= endISO; date = addOneDay(date)) {
    cases.push({date: date, confirmed: covidData.result[date].confirmed})
  }
  res.json(cases);
});

// Return number cumulative cases until given date: e.g. 2021-01-01 returns {data: 36404} or {error} 
app.get('/api/v1/cases/cumulative/:enddate', async(req, res) => {

  // First check if data needs update
  if(checkUpdate()) {
    covidData = await updateCovidData();
  }
  if(covidData.result[req.params.enddate]) {
    res.json({data: covidData.result[req.params.enddate].confirmed});
  }
  else {
    res.json({error: 'not found'})
  }
});

// Return cases for a single date (this days cumul. - previous days cumul)
app.get('/api/v1/cases/daily/:date', async(req, res) => {

  // First check if data needs update
  if(checkUpdate()) {
  covidData = await updateCovidData();
  }

  const confirmedToday = covidData.result[req.params.date].confirmed;
  const confirmedYesterday = covidData.result[addDays(req.params.date, -1)].confirmed;
  res.json(confirmedToday - confirmedYesterday);
});

// ############ Endpoints END ############ //

server.listen(port, host, () => console.log(`Server running at ${host} in port ${port}`));