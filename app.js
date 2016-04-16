// var socket = require('socket.io');
// var fs = require('fs');

var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');

var mysql = mysql.createConnection({
	host     : "localhost",
	user     : "root",
	password : "",
	database : "wacdoc"
});

var selectQuery = 'SELECT * FROM users';
mysql.query(
	selectQuery,
	function select(error, results, fields) {
		if (error) {
			console.log(error);
			mySqlClient.end();
			return;
		}
		console.log(results[1].email)
	});



app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/bower_components'));
console.log(__dirname + '/public');


var server = app.listen(1337, function ()
{
	var host = server.address().address
	var port = server.address().port
	console.log("Example app listening at http://%s:%s", host, port)
	// app.get('/', function (req, res) {
	//    // res.send('ok');
	//    res.sendFile('/paint.html');
	// })
})

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname + '/index.html'));
});


var io = require('socket.io').listen(server);

io.sockets.on('connection', function (socket)
{

	socket.on('register', function (username, email, password) {

		var selectQuery = 'SELECT * FROM users WHERE email = '+email;
		mysql.query(
			selectQuery,
			function select(error, results, fields) {
				if (error) {
					console.log(error);
					mySqlClient.end();
					return;
				}
				if (results.length === 0) {

					mysql.query('insert into users (username, email, password) values ("'+username+'","'+email+'","'+password+'")',
						function selectCb(err, results, fields) {
							if (err) throw err;
							else
								socket.emit('success', 'Inscription réussie.');


						});

				
				} else {
					socket.emit('error', 'Adresse email déjà utilisé.');

				}
			});



	});

	socket.on('text', function (text) {

		console.log(text)
		socket.broadcast.emit('text', text);

	});
	console.log('Un client est connecté !');
});

server.listen(1337);