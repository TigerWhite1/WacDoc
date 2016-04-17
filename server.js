var socket = require('socket.io');
var fs = require('fs');
var express = require('express');
var app = express();

var path = require('path');

app.get('/',function(req, res){
	res.sendfile(path.join(__dirname + '/public/new_doc.html'));
})

app.use(express.static(__dirname + '/public'));

var server = app.listen(1337, function ()
{
	var host = server.address().address;
	var port = server.address().port;
})

var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket)
{
	console.log("Une personne s'est connecter !");  

    socket.on('message', function (message) {
    	socket.broadcast.emit("message",message);
    }); 	
});

server.listen(1337);