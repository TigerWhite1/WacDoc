$(document).ready(function() {
	
var socket = io.connect('http://localhost:1337');

socket.on('text', function(text) {
	$('#text').text(text)

});

socket.on('success', function(message) {
	$('#success').text(message)

});

socket.on('error', function(message) {
	$('#error').text(message)

});

text = $('#text').val();
console.log(text)

$('#form').click(function (e){
	e.preventDefault();
	var username = $('#username').val();
	var email = $('#email').val();
	var password = $('#password').val();
	socket.emit('register', username, email, password);

})

socket.emit('text', text);


});