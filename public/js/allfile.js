$(document).ready(function() {
var socket = io.connect('http://localhost:1337');
socket.on('allfile', function(file){
	console.log(file)
	for (var i = 0; i < file.length; i++) {
		file[i]
		$('#link').append('<a class="file" href="#">'+ file[i] + "</a><br/>")
	};
})

$(document).on('click', '.file', function(event) {
	event.preventDefault();
	var file = $(this)[0].innerText
	socket.emit('file', file);
});	

});    
