var express = require('express'),
    app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

app.use('/public/css', express.static('public/css'));
app.use('/public/js', express.static('public/js'));
// our route handler to use sendFile instead:

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

//When user connects, it will console log when a user connects/disconnects

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', function() {
        console.log('a user disconnected');
    });
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});

io.emit('some event', { for: 'everyone' });

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});



//Starts on following port
const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});

/*
var username;

	socket.send('Welcome to socket.io chat!');
	socket.send('Please input your username:');
	
	socket.on('message', function(message){
		if(!username){
			username = message;
			socket.send("Welcome, " + username + "!");
			io.sockets.send(username + " has joined the chat.");
			return;
		}
		
		io.sockets.send(username + ': ' + message);
	});
	
	socket.on('disconnect', function(){
		io.sockets.send(username + " has left the chat.");
	});
*/