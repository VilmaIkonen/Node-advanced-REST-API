'use strict';

const http = require('http');
const path = require('path');
const express = require('express');
const app = express();

const DataStorage = require('./dataStorageLayer');
const storage = new DataStorage();

const { port, host } = require('./config.json');

const server = http.createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pageviews'));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // for using contents in 'public' folder

// Routes:
app.get('/', (req, res) => {
	res.render('menu');
});

app.get('/all', (req, res) => {
	storage
		.getAll()
		.then((result) => res.render('allPage', { data: result }))
		.catch(err => res.render('statusPage', { status: err }));
});

app.get('/getone', (req, res) => {
	res.render('sendIdPage', { title: 'Get one', header: 'Get', action: '/getone'})
});
app.post('/getone', (req, res) => {
	const id = req.body.id;
	storage.get(id)
	.then(result => res.render('flowerPage', { data: result }))
	.catch(err => res.render('statusPage', { status: err }));
});

app.get('/insert', (req, res) => {
	res.render('form', { 
		title: 'Insert', 
		header: 'Add new', 
		action: '/insert', 
		flowerId: { value: '', readonly: ''},
		name: { value: '', readonly: ''},
		site: { value: '', readonly: ''},
		unitPrice: { value: '', readonly: ''},
		stock: { value: '', readonly: ''}
	})
});
app.post('/insert', (req, res) => {
	storage.insert(req.body)
	.then(result => res.render('statusPage', { status: result }))
	.catch(err => res.render('statusPage', { status: err }))
});

app.get('/updateform', (req, res) => {
	res.render('form', {
		title: 'Update', 
		header: 'Update', 
		action: '/updatedata', 
		flowerId: { value: '', readonly: ''},
		name: { value: '', readonly: 'readonly'},
		site: { value: '', readonly: 'readonly'},
		unitPrice: { value: '', readonly: 'readonly'},
		stock: { value: '', readonly: 'readonly'}
	})
})
app.post('/updatedata', async (req, res) => {
	try {
		const flowerId = req.body.flowerId;
		const result = await storage.get(flowerId);
		if(result.message) {
			res.render('statusPage', { status: result })
		}
		else {
			res.render('form', {
				title: 'Update', 
				header: 'Update', 
				action: '/update', 
				flowerId: { value: result.flowerId, readonly: 'readonly'},
				name: { value: result.name, readonly: ''},
				site: { value: result.site, readonly: ''},
				unitPrice: { value: result.unitPrice, readonly: ''},
				stock: { value: result.stock, readonly: ''}
			})
		}
	} 
	catch (err) {
		res.render('statusPage', { status: err })
	}
});
app.post('/update', (req, res) => {
	storage.update(req.body)
	.then(result => res.render('statusPage', { status: result }))
	.catch(err => res.render('statusPage', { status: err }))
});


app.get('/remove', (req, res) => {
	res.render('sendIdPage', { 
		title: 'Remove', 
		header: 'Remove', 
		action: '/remove'})
});
app.post('/remove', (req, res) => {
	const id = req.body.id;
	storage.remove(id)
	.then(result => res.render('flowerPage', { data: result }))
	.catch(err => res.render('statusPage', { status: err }));
});

server.listen(port, host, () => console.log(`Server ${host}: ${port} running`));
