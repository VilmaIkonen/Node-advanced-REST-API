// No db libries needed in web server, only files needed for creating webpages and for fecthing data from the REST server

'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const {port, host} = require('./configWeb.json');
const {resource} = require('../config.json');
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pageviews'));

app.use(express.static(path.join(__dirname, 'public'))); // access to public folder
app.use(express.urlencoded({extended: false})); // for decoding the forms

app.get('/', (req, res) => res.render('homepage')); 

app.get('/all', async (req, res) => {
  try {
    const result = await fetch(`http://localhost:4000/api/${resource}`, {mode: 'cors'});
    const data = await result.json();
    res.render('allpage', {data});
   } 
  catch (err) {
    fetchError(res);
  }
});

app.route('/getone')
.get((req, res) => res.render('getonepage', {title: 'Get', header: 'Get a game', action: '/getone'}))
.post(async(req, res) => {
  try {
    const number = req.body.number;
    const result = await fetch(`http://localhost:4000/api/${resource}/${number}`, {mode: 'cors'});
    const data = await result.json();
    res.render('gamepage', {data})
  } 
  catch (err) {
    fetchError(res);
  }
});

// INSERT:
// Get form for inserting
app.get('/insert', (req, res) => 
  res.render('formpage', {
    title: 'Add a game', 
    header: 'Game data', 
    action: '/insert', 
    number: {value: '', readonly: ''},
    name: {value: '', readonly: ''},
    quantity: {value: '', readonly: ''},
    genre: {value: '', readonly: ''},
    rating: {value: '', readonly: ''}
  })
);
// post form data to db
app.post('/insert', async (req, res) => {
  try {
    const options = {
      method: 'POST', 
      body: JSON.stringify(req.body), 
      mode: 'cors', 
      headers: {'Content-Type': 'application/json'}
    };

    const result = await fetch(`http://localhost:4000/api/${resource}`, options);
    const data = await result.json();
    res.render('statuspage', {status: data})
  } 
  catch (err) {
    fetchError(res);
  }
});

// UPDATE:
// get form for finding db entry for updating
app.get('/update', (req, res) => 
  res.render('formpage', {
    title: 'Update game data', 
    header: 'Update game data', 
    action: '/updatedata', 
    number: {value: '', readonly: ''},
    name: {value: '', readonly: 'readonly'},
    quantity: {value: '', readonly: 'readonly'},
    genre: {value: '', readonly: 'readonly'},
    rating: {value: '', readonly: 'readonly'}
  })
);

// form for updating the data
app.post('/updatedata', async (req, res) => {
  try {
    const number = req.body.number;
    const result = await fetch(`http://localhost:4000/api/${resource}/${number}`, {mode: 'cors'});
    const data = await result.json();
    if(data.message) {
      res.render('statuspage', {status: data}) // this if is needed because CODES/MESSAGES have 'type' and also the book db has filed 'type'
    } 
    else {
      res.render('formpage', {
        title: 'Update game data', 
        header: 'Update game data', 
        action: '/update', 
        number: {value: data.number, readonly: 'readonly'},
        name: {value: data.name, readonly: ''},
        quantity: {value: data.quantity, readonly: ''},
        genre: {value: data.genre, readonly: ''},
        rating: {value: data.rating, readonly: ''}
      }) 
    }   
  } 
  catch (err) {
    fetchError(res);
  }
});

// post the updated data to db
app.post('/update', async (req, res) => {
  try {
    const options = {
      method: 'PUT', 
      body: JSON.stringify(req.body), 
      mode: 'cors', 
      headers: {'Content-Type': 'application/json'}
    };

    const result = await fetch(`http://localhost:4000/api/${resource}/${req.body.number}`, options);
    const data = await result.json();
    res.render('statuspage', {status: data})
  } 
  catch (err) {
    fetchError(res);
  }
})

app.route('/remove')
.get((req, res) => res.render('getonepage', {title: 'Remove', header: 'Remove', action: '/remove'}))
.post(async(req, res) => {
  try {
    const number = req.body.number;
    const options = {method: 'DELETE', mode: 'cors'}; 
    const result = await fetch(`http://localhost:4000/api/${resource}/${number}`, options);
    const data = await result.json();
    res.render('statuspage', {status: data})
  } 
  catch (err) {
    fetchError(res);
  }
});

server.listen(port, host, () => console.log(`Server running on ${host}: ${port}`))


// for sending error message if fetching failes (eg. if url to rest server is wrong)
function fetchError(res) {
  const status = {message: 'fetch failed', type: 'error'};
  res.render('statuspage', {status})
}