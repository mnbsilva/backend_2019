// cria ligacao a DB 
// MySQL connection
var mysql = require('mysql')
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'persondb'
});

// inicializa o server
const express = require('express')
const app = express()
const port = 3000
const fs = require('fs');
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

connection.connect();

// /persons GET empty Show list of all the persons.
app.get('/persons', function(req,res){  
    connection.query('SELECT * FROM Persons', function (err, rows, fields){
        if (err) throw err
        res.send(rows);
    })    
});

// /persons POST JSON String Add details of new person.
app.post('/persons', function(req,res){
    var sql = "INSERT INTO persons set ?";
    var values = req.body;
    connection.query(sql, values, function (err, rows, fields) {   
        if (err) throw err
        res.send("Id:" + rows.insertId);
    })    
});

// /persons DELETE JSON String Delete an existing person. falta fazer)
app.delete('/persons', function(req,res){
    var sql = "INSERT INTO persons set ?";
    var values = req.body;
    connection.query(sql, values, function (err, rows, fields) {   
        if (err) throw err
        res.send("Id:" + rows.insertId);
    })    
});

// /persons/:id GET empty Show details of a person.
app.get('/person/:id', function(req,res){  
    var id = req.params.id;
    connection.query('SELECT * FROM Persons WHERE Id= ?', [id], function (err, rows, fields){
        if (err) throw err;
        res.send(rows);
    })    
});

// /persons/:age/:profession GET empty Show details of multiple 
app.get('/persons/:age/:profession', function(req,res){  
    var age = req.params.age;
    var profession = req.params.profession;
    connection.query('SELECT * FROM Persons where age=? and profession=?', [age, profession], function (err, rows, fields){
        if (err) throw err
        res.send(rows);
    })    
});


//
app.use(bodyParser.urlencoded({extended: false}));
//
app.use(bodyParser.json());

// test server
app.get('/', (req, res) => res.send('Hello World!'))


// Servidor esta a escuta
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
});
