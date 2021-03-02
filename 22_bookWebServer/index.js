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

app.get('/all', async (req, res) => {
  try {
    const result = await fetch('http://localhost:4000/books', {mode: 'cors'});
    const data = await res.json();
    res.render('allpage', {data});
   } 
  catch (err) {
    console.log(err)
  }
})

server.listen(port, host, () => console.log(`Server running on ${host}: ${port}`))
