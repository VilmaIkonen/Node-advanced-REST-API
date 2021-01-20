'use strict';

const http = require('http');
const path = require('path');
const url = require('url');

const { port, host, activeStorage } = require('./mainServerConfig.json');
const baseDir = __dirname;

const { storage, storageLibraries } = require(path.join(baseDir,activeStorage));
const {createDataStorage} = 
	require(path.join(baseDir, storageLibraries.folder,storageLibraries.dataLayer));
    
const { resource, key } = require(path.join(baseDir,storage.folder,storage.storageConfig));
const dataStorage = createDataStorage(baseDir, {storage, storageLibraries});

const server = http.createServer(async(req, res) => {
	const route = decodeURIComponent(url.parse(req.url).pathname);

	try {
		const method = req.method.toUpperCase();

		if(method === 'OPTIONS') {
			sendOptionsResponse(res);
		}
		else if(route === resource) {
			if(method === 'GET') { 
				const result = await dataStorage.getAll();
				sendJson(res, result);
			}
			else if(method === 'POST') { 
				try {
					const resultPost = await getJson(req);
					const queryResultPost = await dataStorage.insert(key, resultPost);
					sendJson(res, queryResultPost);
				}
				catch(err) {
					sendJson(res, err, 404);
				}
			}
		}
		else if(route.startsWith(`${resource}/`)) {
			const pathParts = route.split('/');
			// console.log(pathParts); --> [ '', 'api', 'books', '1' ]
			
			if(pathParts.length > 3 && pathParts[3].length > 0) { // hardcoding is not a good thing...
				const value =+ pathParts[3]; // --> 'books'

				switch(method) {
					case 'GET': 
						const resultGet = await dataStorage.get(key, value);
						sendJson(res, resultGet);
						break;
					
					case 'DELETE': 
						const resultDelete = await dataStorage.remove(key, value);
						sendJson(res, resultDelete);
						break;
					
					case 'PUT': 
						try {
							const resultPut = await getJson(req);
							const queryResultPut = await dataStorage.update(key, value, resultPut);
							sendJson(res, queryResultPut);
						} 
						catch (err) {
							sendJson(res, err, 404);									
						}
						break;

					default:	
						sendJson(res, {message: 'Method not in use'}, 405);
				}
			}
			else {
				sendJson(res, {message: `${key} missing`})
			}
		}
		else {
			sendJson(res, error, 404); // if some non-existing route is given
		}
	} 
	catch (error) {		
		sendJson(res, { message: error.message}, 404);			
	}
});

server.listen(port,host, ()=>console.log(`Server ${host} is serving at port ${port}`));

// ALL FUNCTIONS below could be added also in library section:

function sendOptionsResponse(res, statusCode = 200) {
	res.statusCode = statusCode;
	res.setHeader('X-Powered-By', 'Pure Node');
	res.setHeader('Access-Control-Allow-Origin', '*'); // Access from anywhere
	res.setHeader('Access-Control-Allow-Methods', '*'); // All methods allowed
	res.setHeader('Access-Control-Allow-Headers', 'Origin, Accept, Content-Type');
	res.setHeader('Content-Length', 0); // As body is not going back, only headers --> length = 0
	res.end();
};

function sendJson(res, jsonResource, statusCode = 200) {
	const jsonData = JSON.stringify(jsonResource);
	const jsonLength = Buffer.byteLength(jsonData, 'utf8'); // Buffer class is used to store the coming data, bytelength(method of Buffer) takes utf8 encoding into account
	res.statusCode = statusCode;
	res.setHeader('X-Powered-By', 'Pure Node');
	res.setHeader('Content-Type', 'application/json');
	res.setHeader('Content-Length', jsonLength);
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.end(jsonData);
};

function getJson(req) {
	return new Promise((resolve, reject) => {
		if(req.headers['content-type'] !== 'application/json') {
			reject('Wrong Content-Type');
		}
		else {
			const databuffer = [];
			// Request handling in Node:
			req.on('data', messageFragment => databuffer.push(messageFragment));
			req.on('end', () => resolve(JSON.parse(Buffer.concat(databuffer).toString())));
			req.on('error', () => reject('Error during the data transfer'));
		}
	})
}