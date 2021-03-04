'use strict';

const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');

const DataStorage = require('./storage/dataStorageLayer');
const db = new DataStorage();
const {CODES, MESSAGES} = require('./statusCodes');

const {port, host, resource, idKey} = require('./configREST.json');
const server = http.createServer(app);

app.use(cors());
app.use(express.json()); // for using json data (in webserver: urlencoded)

// ROUTES:
// get and post operations need only books (here 'resource) in the route
app.get(`/${resource}`, (req, res) => {
  db.getAll()
  .then(result => res.json(result)) // return json
  .catch(err => res.json(err));
});

// delete and update operations use same route, also id (here 'value') needed
app.route(`/${resource}/:value`)
.get((req, res) => db.get(req.params.value)
  .then(result => res.json(result))
  .catch(err => res.json(err)))
.delete((req, res) => db.remove(req.params.value)
  .then(result => res.json(result))
  .catch(err => res.json(err)))
.put((req, res) => {
  if(!req.body) return res.sendStatus(400); // if body/payload missing, status code sent
  if(req.body[idKey] == req.params.value){
    db.update(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
  }  
  else {
    res.json(MESSAGES.NOT_UPDATED());
  }
})

app.post(`/${resource}`, async (req, res) => {
  if(!req.body) return res.sendStatus(400);
  try {
    const status = await db.get(req.body[idKey]);
    if(status.code && status.code === CODES.NOT_FOUND) {
      res.json(await db.insert(req.body));      
    }
    else {
      res.json(MESSAGES.NOT_INSERTED())
    }
  } 
  catch (error) {
    res.json(MESSAGES.PROGRAM_ERROR());
  }
})

server.listen(port, host, () => console.log(`REST server running on ${host}: ${port}`))