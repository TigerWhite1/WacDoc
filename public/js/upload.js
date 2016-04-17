$(document).ready(function(){

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
            the_url = event.target.result;
            $('#upload').append("<div class='name'>"+file.name+"</div>");
        };

        $('#upload').html("");

        reader.readAsDataURL(file);
    }
})