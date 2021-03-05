'use strict';

const http = require('http');
const express = require('express');
const app = express();
const cors = require ('cors');

const DataStorage = require('../dbStorage/dataStorageLayer');
const db = new DataStorage();
const {CODES, MESSAGES} = require('../statusCodes');

const {port, host, resource, idKey} = require('./configREST.json');
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// ROUTES:
// Get all:
app.get(`/api/${resource}`, (req, res) => {
  db.getAll()
    .then(result => res.json(result))
    .catch(err => res.json(err))
});

// Delete&update (both operations use same route resource + value=number)
app.route(`/api/${resource}/:value`)
  .get((req, res) => db.get(req.params.value)
    .then(result => res.json(result))
    .catch(err => res.json(err)))
  .delete((req, res) => db.remove(req.params.value)
    .then(result => res.json(result))
    .catch(err => res.json(err)))
  // put= sort of a "post" for update
  .put((req, res) => {
    if(!req.body) {
      return res.sendStatus(400); // if body/payload missing, send error statuscode
    }
    if(req.body[idKey] == req.params.value) {
      db.update(req.body)
        .then(result => res.json(result))
        .catch(err => res.json(err))
    }
    else {
      res.json(MESSAGES.NOT_UPDATED());
    }
  }
)

// post route for insert
app.post(`/api/${resource}`, async (req, res) => {
  if(!req.body) {
    return res.sendStatus(400);
  }
  try {
    const status = await db.get(req.body[idKey]);
    if(status.code && status.code == CODES.NOT_FOUND) {
      res.json(await db.insert(req.body));
    }
    else {
      res.json(MESSAGES.NOT_INSERTED());
    }
  }
  catch (err) {
    res.json(MESSAGES.PROGRAM_ERROR());  
  }
})

server.listen(port, host, () => console.log(`Server running on ${host}, port ${port}`));