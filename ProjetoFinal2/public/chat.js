$(function () {
    //make connection
    var socket = io.connect('http://localhost:3000')

    //buttons and inputs
    var message = $("#message");
    var username = $("#username");
    var send_message = $("#send_message");
    var send_user = $("#send_user")
    var chatroom = $("#chatroom");
    var feedback = $("#feedback");
    var users = $("#users");

    //Emit message
    send_message.click(function(){
        console.log("test");
        socket.emit('send_message',{message: message.val() });
    });

    //Emit a username
	send_user.click(function(){
        console.log("test");
		socket.emit('send_user', {username : username.val() })
    });
    
    // //Emit an image
    // send_image.click(function(){
    //     console.log("test");
    // });

    //Listen on new_message

    socket.on('broadcast_message', function (data) {
        chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
    });

    //Listen on new user connection
    socket.on('user_connect', function (data) {
        feedback.append("<p class='feedback'>" + data.username + " connected." + "</p>");
    });
    
    //Listen on user disconnection
    socket.on('user_disconnected', function (data) {
        feedback.append("<p class='feedback'>" + data.username + " disconnected." + "</p>");
    });

    //Listen on username change
    socket.on('username_change', function (data) {
        feedback.append("<p class='feedback'>" + data.olduser + " changed username to " + data.newuser + "." +"</p>");
    });

    //Listen on whisper
    socket.on('private_message', function (data) {
        chatroom.append('<p class="private_message"><em><strong>'+ data.from +' -> '+ data.to +'</strong>: '+ data.message +'</em></p>');
    });

    //Listen on username updates
    socket.on('usernames', function (data) {
        var html = '';
        for(i=0; i < data.length; i++){
            html += data[i] + '<br/>'
        }
        users.html(html);
    });

    //No user error
    socket.on('no_user', function (data) {
        chatroom.append('<p class="error">'+ "The user " + data.user +" doesn't exist."  +'</p>');
    });
});