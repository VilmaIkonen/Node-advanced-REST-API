'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const fetch = require('node-fetch');

const port = 3000;
const host = 'localhost';

const { readStorage, writeStorage } = require('./jsonReaderWriter');

const app = express();

const server = http.createServer(app);

const dataPath = 'vantaaData.json';

function checkUpdate() {
  // here some code to check if it is time to update local data
  return false; // return true; used only for debugging
}

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'vantaaJobsHome.html')));

// when fetching data from local datafile
app.get('/json', async (req, res) => {
  if(checkUpdate()) {
    try {
      const result = await fetch('http://gis.vantaa.fi/rest/tyopaikat/v1');
      const data = await result.json();
      await writeStorage(dataPath, data);
      res.json(data);
      console.log('Updated'); // For debugging. If in upeer part return true --> console: 'Updated', meaning it gets the data from Vantaa API
    } 
    catch (err) {
      console.log('update failed', err.message)
      res.sendStatus = 404;   
    }
  }
  else {
  const storage = await readStorage(dataPath);
  res.json(storage)
  }
})

server.listen(port, host, () => console.log(`Server ${host} running at port ${port}`))