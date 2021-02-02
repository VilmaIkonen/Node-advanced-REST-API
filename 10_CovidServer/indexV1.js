'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');

const covidData = require('./FIN.json');
const { port, host } = require('./config.json');

const app = express();
const server = http.createServer(app);

// Webpage paths:
const homePath = path.join(__dirname, 'home.html');
const cumulativeBarsPath = path.join(__dirname, 'cumulativeBars.html');
const dailyBarsPath = path.join(__dirname, 'dailyBars.html');
const dailyLinePath = path.join(__dirname, 'dailyLine.html')

app.use(cors());

app.get('/', (req, res) => res.sendFile(homePath));
app.get('/cumulativebars', (req, res) => res.sendFile(cumulativeBarsPath));
app.get('/dailybars', (req, res) => res.sendFile(dailyBarsPath));
app.get('/dailyline', (req,res) => res.sendFile(dailyLinePath));

// ###### Endpoints: ###### //

app.get('/api/v1/data', async(req, res) => {
  const dateStrings = Object.keys(covidData.result) // keys in result are the dates in json file
  const data = dateStrings.map(date => covidData.result[date].confirmed) // get number of confirmed cases from the array

  // another query type for data:
  // const data = dateStrings.map(date => 
  //   ({
  //     date, 
  //     confirmed: covidData.result[date]
  //   })) 
  
  res.json(data);
})

app.get('/api/v1/daily', async(req, res) => {
  const dateStrings = Object.keys(covidData.result) // keys in result are the dates in json file
  const data = dateStrings.map(date => covidData.result[date].confirmed) // get number of confirmed 

  const dailyCases = [];
  for (let i=0; i<data.length-1; i++) {
    dailyCases.push(data[i+1]-data[i]); // next - previous data
  }  
  res.json(dailyCases);
})


server.listen(port, host, () => console.log(`Server running at ${host} in port ${port}`))