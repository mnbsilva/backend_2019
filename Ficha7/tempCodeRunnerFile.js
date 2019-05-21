const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
var bodyParser = require('body-parser');
//
app.use(bodyParser.urlencoded({extended: false}));
//
app.use(bodyParser.json());

// test server
app.get('/', (req, res) => res.send('Hello World!'))