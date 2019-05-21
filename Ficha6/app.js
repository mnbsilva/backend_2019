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


// function writeLog(request, response){
//     var log = request.path + ", " + request.method + ", " + new Date() + "\n";
//     fs.appendFile ('log.txt', log, function (err){
//         if (err) throw err;
//     })
// }

//
function logUpdate(request, response){
    var log = request.path + ", " + request.method + ", " + new Date() + "\n";
    fs.appendFile ('log.txt', log, function (err){
        if (err) throw err;
        console.log('Data appended to file')
    })
}

function readfile(filename){
    var file=fs.readFileSync(fileName, 'utf-8');
    return file;
}

app.get('/downloadlog', function(request, response){
    logUpdate (request, response)
    response.download('log.txt');
});


app.get('/list', function(request, response){
    logUpdate(request, response);
    var file = fs.readFileSync('log.txt', 'utf-8');
    response.send(file);
    });

app.delete('/clearlog', function(request, response){
    fs.unlink ('log.txt',  function (err){
        if (err) throw err;
        response.send ('log.txt was deleted')
        console.log('log.txt was deleted');
    });
});

// Servidor está a escuta
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
    fs.open('log.txt', 'a', function (err){
        if (err) throw err;
        console.log('The "data to append" was appended to the file');
    });
});