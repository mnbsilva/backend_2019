// import express module
const express = require('express')
const bodyParser = require('body-parser');
// const uuid = require('uuid/v1');

// create express instance
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// var uuid = uuid();

const port = 3000

// import file system module
const fs = require('fs')



// function to load file
function readFile(filename) {
  var file = fs.readFileSync(filename, 'utf-8');
  return file;
}

//GET request to list all the users 
app.get('/users', function (request, response) {
  var x = readFile('./persons.json');
  response.send(x);
});

//POST
app.post('/users', function (request, response) {
  var file = readFile('./persons.json');
  // var obj = JSON.parse(file);
  var jsonData = JSON.parse(file);

  var keys = Object.keys(jsonData);
  var obj_length = keys.length;
  obj_length++;

  jsonData['person' + obj_length] = request.body;

  response.send(jsonData);

});

//DELETE
app.delete('/users/:id', function (request, response) {
  var file = readFile('./persons.json');
  var jsonData = JSON.parse(file);
  var id = request.params.id;
  // var key = "person"+ id;

  delete jsonData ["person"+ id];
  response.send(jsonData);
});

//GET
app.get('/users/:id', function (request, response) {
  var file = readFile('./persons.json');
  var jsonData = JSON.parse(file);
  var id = request.params.id;
  var key = "person"+ id;

  var person =jsonData[key];
  response.send(person);
});



app.get('/', function (request, response) {
  response.send('Hello World!');
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))