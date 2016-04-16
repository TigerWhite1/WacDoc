
var socket = io.connect('http://localhost:1337');

socket.on('message', function(text) {


});

text = "salut salut"

socket.emit('crayon', text);
