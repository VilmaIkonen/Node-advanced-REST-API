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
  try {
    if(checkUpdate()) {
      const result = await fetch('http://gis.vantaa.fi/rest/tyopaikat/v1');
      const data = await result.json();
      await writeStorage(dataPath, data);
      res.json(data);
      console.log('Updated'); // For debugging. If in upeer part return true --> console: 'Updated', meaning it gets the data from Vantaa API
;    }
else {
  const storage = await readStorage(dataPath);
  res.json(storage)
}
  } 
  catch (error) {
    res.sendStatus = 404;   
  }
})

server.listen(port, host, () => console.log(`Server ${host} running at port ${port}`))