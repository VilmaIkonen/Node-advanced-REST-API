// Server with express and cors

'use strict';

const http = require('http');
const express = require ('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;
const host = 'localhost';

const DataLayer = require('./datastorageLayer');
const db = new DataLayer();

const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.get('/employees', async(req, res) => {
  try {
    res.json(await db.getAll())
  }
    catch(err) {
    console.log(err)
  }
});

app.get('/employees/:employeeId', async(req, res) => {
  try {
    res.json(await db.get(+req.params.employeeId))
  } 
  catch (err) {
    console.log(err)
  }
})

server.listen(port, host, () => console.log(`Server running in ${host} at port ${port}`))