// require and instantiate express
var express = require('express');
var app = express();
var uuidv1 = require('uuid/v1');
var fs = require('fs');
var multer = require('multer');
var ejs = require('ejs');
var users = {};
var path = require('path');

//set up storage
var storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname + "-" + Date.now()+
        path.extname(file.originalname));
    }
});
//upload
var upload = multer({
    storage: storage,
    limits: {fileSize: 5000000}
}).single('userFile');

// set up ejs for templating
app.set('view engine', 'ejs');

//middlewares
app.use(express.static('public'));

// express server
var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port);
});

// route
app.get('/', function (req, res) {
    res.render('index.ejs',{users: users});
});

app.post('/upload', function (req,res,next){
    upload(req,res,(err)=>{
        if(err){
            res.render('index',{
                msg: err
            });
        }else{
            res.render('index',{
                msg: 'File Uploaded',
                file: `uploads/${req.file.filename}`
            });
        };
    });
});

var io = require('socket.io')(server);

// Registar o evento Connection

io.on('connection', function (socket) {
    console.log("New User Connected");
    console.log(socket.id);
    //default username
    socket.username = "User " + uuidv1();
    users[socket.username] = {socket};
    appendData = "Connection // " + socket.username + " // " + new Date() +"\n"; //Connect/Disconnect, user, date
    fs.appendFile('SessionHistory.txt', appendData, (err) => {
        if (err) throw err;
        console.log('SessionHistory.txt updated');
    });
    socket.broadcast.emit('user_connect', {username : socket.username});
    updateUsers();
    //listen on new message
    socket.on('send_message', (data) => {
        console.log(data);
        //private message
        if(data.message[0] == "@"){
            var user = "";
            var i = 1;
            while(data.message[i] != ":" && data.message[i] != undefined){
                user += data.message[i];
                i += 1;
            };
            i += 1;
            var msg = data.message.substring(i);
            if(users[user]){
                // socket.emit('private_message',{message: msg, from:socket.username, to: user});
                console.log(users[user].socket.id);
                io.to(users[user].socket.id).emit('private_message',{message: msg, from:socket.username, to: user});
            }
            else{
                io.to(socket.id).emit('no_user', {user: user});
            }
        }
        else{
        //broadcast the new message
        io.sockets.emit('broadcast_message',{message: data.message, username: socket.username});
        //Criar ficheiro log diário
        var date = new Date();
        var day = date.getDate();
        var month = (date.getMonth()) + 1;
        var filename = day.toString() + "-" + month.toString();
        appendData = socket.username + ": " + data.message + "\n";
        fs.appendFile(filename, appendData, (err) => {
            if (err) throw err;
            console.log(filename ,' updated');
        });
        //
        };
    });

    //listen on username change
    socket.on('send_user', (data) => {
        io.emit('username_change', {olduser: socket.username, newuser: data.username});
        delete users[socket.username];
        socket.username = data.username;
        users[socket.username] = {socket};
        updateUsers();
    });

    //Listen on private message
    socket.on("private_message", function(data) {      
        io.sockets.sockets[data.to].emit("private_message", { from: socket.id, to: data.to, msg: data.msg });
        client.emit("private_message", { from: socket.id, to: data.to, msg: data.msg });
    });
    
    //Listen on user disconnect
    socket.on('disconnect', function () {
        io.emit('user_disconnected', {username: socket.username});
        console.log("User disconnected: ", socket.id);
        appendData = "Disconnection // " + socket.username + " // " + new Date() +"\n"; //Connect/Disconnect, user, date
        fs.appendFile('SessionHistory.txt', appendData, (err) => {
            if (err) throw err;
            console.log('SessionHistory.txt updated');
        });
        delete users[socket.username];
        updateUsers();
      });
});

//Function to update users on the index.ejs
function updateUsers(){
    io.sockets.emit('usernames', Object.keys(users));
};