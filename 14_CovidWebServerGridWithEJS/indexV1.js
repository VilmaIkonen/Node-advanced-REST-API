'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');
const { port, host } = require('./config.json');
const app = express();
const server = http.createServer(app);

// Webpage paths:
const menuPath = path.join(__dirname, '/pages/menu.html');
const summaryPath = path.join(__dirname, '/pages/summary.html');
const summaryWithCanvasPath = path.join(__dirname, '/pages/summaryWithCanvas.html');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'))
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(menuPath));

app.get('/cumulativeline', (req, res) =>
 res.render('chart', {uri: '/api/v1/cases/cumulative', type: 'Line', header: 'Covid-19 cases in Finland, cumulative line chart'}));

app.get('/cumulativebars', (req, res) =>  
  res.render('chart', {uri: '/api/v1/cases/cumulative', type: 'Bar', header: 'Covid-19 cases in Finland, cumulative bar chart'}));

app.get('/dailybars', (req, res) =>   
  res.render('chart', {uri: '/api/v1/cases/daily', type: 'Bar', header: 'Covid-19 cases in Finland, daily bar chart'}));

app.get('/dailyline', (req,res) => 
  res.render('chart', {uri: '/api/v1/cases/daily', type: 'Line', header: 'Covid-19 cases in Finland, daily line chart'}));

app.get('/summary', (req, res) => res.sendFile(summaryPath));

app.get('/summarywithcanvas', (req, res) => res.sendFile(summaryWithCanvasPath));

server.listen(port, host, () => console.log(`Server running at ${host} in port ${port}`))