$(document).ready(function(){
    var socket = io.connect('http://localhost:1337');

    $('#upload').hide();

    $("#file").change(function() {
        $('#upload').show();
        for(i=0;i<this.files.length;i++){
            renderImage(this.files[i]);
        }
    });

    function renderImage(file) {

        var reader = new FileReader();

        reader.onload = function(event) {
            $('#upload').append("<div class='name'>"+file.name+"</div>");
        };

        $('#upload').html("");

        reader.readAsDataURL(file);
    }
    
})
