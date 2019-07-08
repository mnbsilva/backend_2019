$(function () {
    //client-side, 
        //connect to the server and send events
    //make connection
    var socket = io.connect('http://localhost:3000')
    

    //buttons and inputs
    var message = $("#message");
    var send_message = $("#send_message");
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");

    //Emit message
    send_message.click(function () {
        //console log to teste "send_message"
        console.log("click")
        socket.emit('send_message', {message: message.val() })
    })

    //listen on new_message
    socket.on('broadcast_message', function (data) {
        console.log(data)
    })

    //user disconnected
    socket.on('user_disconnected', function (data) {
    })

   

    
});