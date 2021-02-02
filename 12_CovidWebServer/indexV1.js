'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const cors = require('cors');

const { port, host } = require('./config.json');

const app = express();
const server = http.createServer(app);

// Webpage paths:
const homePath = path.join(__dirname, 'home.html');
const cumulativeBarsPath = path.join(__dirname, 'cumulativeBars.html');
const dailyBarsPath = path.join(__dirname, 'dailyBars.html');
const dailyLinePath = path.join(__dirname, 'dailyLine.html')

app.use(cors());

app.get('/', (req, res) => res.sendFile(homePath));
app.get('/cumulativebars', (req, res) => res.sendFile(cumulativeBarsPath));
app.get('/dailybars', (req, res) => res.sendFile(dailyBarsPath));
app.get('/dailyline', (req,res) => res.sendFile(dailyLinePath));

// ###### no need for Endpoints in this web version, they are in rest server, port 4000 (task 11) ###### //

server.listen(port, host, () => console.log(`Server running at ${host} in port ${port}`))