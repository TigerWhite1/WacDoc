$(document).ready(function(){
	$('#new_file').click(function(){

		$('#file').html('<div id="content_file" contenteditable="true"></div><br/><a id="save">Save</a><br/><input type="file" id="load_file">');

		document.getElementById('save').addEventListener('click', function() {

			var name = prompt("inserer le nom de votre fichier", "");

			if (name !== null)
			{
				download(this, name+'.txt');
			}

		}, false);

		document.querySelector('#load_file').addEventListener('change', function(evt) {

			var files = document.getElementById('load_file').files;

			if (!files.length) {
				alert('Please select a file!');
				return;
			}

			var file = files[0];

			var reader = new FileReader();

			reader.onloadend = function(evt) {
				document.getElementById('content_file').textContent = evt.target.result;
			};

			reader.readAsBinaryString(file);

		}, false);

		var handleDrag = function(e) {
			e.stopPropagation();
			e.preventDefault();
		};
		var handleDrop = function(e) {
			e.stopPropagation();
			e.preventDefault();
			x = e.clientX;
			y = e.clientY;
			var file = e.dataTransfer.files[0];
			if (file.type.match('image.*')) {
				var reader = new FileReader();
				reader.onload = (function(theFile) {
					var dataURI = theFile.target.result;
					var img = document.createElement("img");
					img.src = dataURI;
					if (document.caretPositionFromPoint) {
						var pos = document.caretPositionFromPoint(x, y);
						range = document.createRange();
						range.setStart(pos.offsetNode, pos.offset);
						range.collapse();
						range.insertNode(img);
					}
					else if (document.caretRangeFromPoint) {
						range = document.caretRangeFromPoint(x, y);
						range.insertNode(img);
					}
					else
					{
						console.log('could not find carat');
					}


				});
				reader.readAsDataURL(file);
			}
		};

		var dropZone = document.getElementById('content_file');
		dropZone.addEventListener('dragover', handleDrag, false);
		dropZone.addEventListener('drop', handleDrop, false);

	})

	function download(link, filename) {
		link.href = "data:text/text," + $("#content_file").html(); //.replace(/(<([^>]+)>)/ig,"");
		link.download = filename;
	}

})