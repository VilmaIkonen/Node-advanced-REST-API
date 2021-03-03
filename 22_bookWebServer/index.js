// No db libries needed in web server, only files needed for creating webpages and for fecthing data from the REST server

'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
const {port, host} = require('./config.json');
const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pageviews'));

app.use(express.static(path.join(__dirname, 'public'))); // access to public folder
app.use(express.urlencoded({extended: false})); // for decoding the forms

app.get('/', (req, res) => res.render('menu')); // If want to make manu.ejs generic, pass here data for 'resource', now resource = book (example in task 14)

app.get('/all', async (req, res) => {
  try {
    const result = await fetch('http://localhost:4000/books', {mode: 'cors'});
    const data = await res.json();
    res.render('allpage', {data});
   } 
  catch (err) {
    fetchError(res);
  }
});

app.route('/getone')
.get((req, res) => res.render('getform', {title: 'Get', header: 'Get', action: '/getone'}))
.post(async(req, res) => {
  try {
    const bookID = req.body.bookID;
    const result = await fetch(`http://localhost:4000/books/${bookID}`, {mode: 'cors'});
    const data = await result.json();
    res.render('bookpage', {data})
  } 
  catch (err) {
    fetchError(res);
  }
});

app.route('/remove')
.get((req, res) => res.render('getform', {title: 'Remove', header: 'Remove', action: '/remove'}))
.post(async(req, res) => {
  try {
    const bookID = req.body.bookID;
    const options = {method: 'DELETE', mode: 'cors'}; // no body/payload needed here as it oes through uri
    const result = await fetch(`http://localhost:4000/books/${bookID}`, options);
    const data = await result.json();
    res.render('statuspage', {status: data})
  } 
  catch (err) {
    fetchError(res);
  }
});

app.get('/insertform', (req, res) => res.render('form', {
  title: 'Add a book', 
  header: 'Book data', 
  action: '/insert', 
  bookID: {value: '', readonly: ''},
  name: {value: '', readonly: ''},
  author: {value: '', readonly: ''},
  type: {value: '', readonly: ''},
  year: {value: '', readonly: ''}
  })
);

app.post('/insert', async (req, res) => {
  try {
    const options = {
      method: 'POST', 
      body: JSON.stringify(req.body), 
      mode: 'cors', 
      headers: {'Content-Type': 'application/json'}
    };

    const result = await fetch('http://localhost:4000/books', options);
    const data = await result.json();
    res.render('statuspage', {status: data})
  } 
  catch (err) {
    fetchError(res);
  }
});

app.get('/updateform', (req, res) => 
  res.render('form', {
    title: 'Update a book', 
    header: 'Book data', 
    action: '/updatedata', 
    bookID: {value: '', readonly: ''},
    name: {value: '', readonly: 'readonly'},
    author: {value: '', readonly: 'readonly'},
    type: {value: '', readonly: 'readonly'},
    year: {value: '', readonly: 'readonly'}
  })
);

app.post('/updatedata', async (req, res) => {
  try {
    const bookID = req.body.bookID;
    const result = await fetch(`http://localhost:4000/books/${bookID}`, {mode: 'cors'});
    const data = await result.json();
    if(data.message) {
      res.render('statuspage', {status: data}) // this if is needed because CODES/MESSAGES have 'type' and also the book db has filed 'type'
    } 
    else {
      res.render('form', {
        title: 'Update a book', 
        header: 'Book data', 
        action: '/updatedata', 
        bookID: {value: data.bookID, readonly: 'readonly'},
        name: {value: data.name, readonly: ''},
        author: {value: data.author, readonly: ''},
        type: {value: data.type, readonly: ''},
        year: {value: data.year, readonly: ''}
      }) 
    }   
  } 
  catch (err) {
    fetchError(res);
  }
});

app.post('/update', async (req, res) => {
  try {
    const options = {
      method: 'PUT', 
      body: JSON.stringify(req.body), 
      mode: 'cors', 
      headers: {'Content-Type': 'application/json'}
    };

    const result = await fetch(`http://localhost:4000/books/${req.body.bookID}`, options);
    const data = await result.json();
    res.render('statuspage', {status: data})
  } 
  catch (err) {
    fetchError(res);
  }
})

server.listen(port, host, () => console.log(`Server running on ${host}: ${port}`))


// for sending error message if fetching failes (eg. if url to rest server is wrong)
function fetchError(res) {
  const status = {message: 'fetch failed', type: 'error'};
  res.render('statuspage', {status})
}