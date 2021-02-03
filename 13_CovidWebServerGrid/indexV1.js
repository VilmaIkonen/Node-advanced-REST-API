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
const cumulativeLinePath = path.join(__dirname, '/pages/cumulativeLine.html');
const cumulativeBarsPath = path.join(__dirname, '/pages/cumulativeBars.html');
const dailyBarsPath = path.join(__dirname, '/pages/dailyBars.html');
const dailyLinePath = path.join(__dirname, '/pages/dailyLine.html');
const summaryPath = path.join(__dirname, '/pages/summary.html');
const summaryWithCanvasPath = path.join(__dirname, '/pages/summaryWithCanvas.html');

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => res.sendFile(menuPath));
app.get('/cumulativeline', (req, res) => res.sendFile(cumulativeLinePath));
app.get('/cumulativebars', (req, res) => res.sendFile(cumulativeBarsPath));
app.get('/dailybars', (req, res) => res.sendFile(dailyBarsPath));
app.get('/dailyline', (req,res) => res.sendFile(dailyLinePath));
app.get('/summary', (req, res) => res.sendFile(summaryPath));
app.get('/summarywithcanvas', (req, res) => res.sendFile(summaryWithCanvasPath));

// ###### no need for Endpoints in this web version, they are in rest server, port 4000 (task 11) ###### //

server.listen(port, host, () => console.log(`Server running at ${host} in port ${port}`))