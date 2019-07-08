// require and instantiate express
var express = require('express');
var app = express();

app.set('view engine', 'ejs'); // set up ejs for templating

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
    res.render('index.ejs');
});

var io = require('socket.io')(server);

// Registar o evento Connection
io.on('connection', function (socket) {
    console.log("New User Connection");
    console.log(socket.id);
    //default username
    socket.username = "Anonymous";

    //later tasks
        //1-create a random username (later)
        //2-create logfile

    //listen on new message
    socket.on('send_message', (data) => {
        console.log(data);
        //broadcast the new message
        //criar variavel dos dadosa enviar
        var dados_a_enviar = {message: data.message, username: socket.username}
        io.sockets.emit('broadcast_message', { dados_a_enviar });
    });

    //disconnect
    socket.on('disconnect', function () {
        io.emit('user_disconnected', {id: socket.id});
        console.log("User disconnected:", socket.id);

    });



});




