$('document').ready(function () {
    $('#text-zone').focus();

    $('#color').on('change', function () {
        document.execCommand('ForeColor', false, $('#color').val());
    });

    $('.text-zone').on('keypress', function () {
        document.execCommand('ForeColor', false, $('#color').val());
    });

    function link() {
        var linkURL = prompt('Enter an URL:', 'http://');
        document.execCommand('createlink', false, linkURL);
        var link = $('a');
        link.off('mouseenter').on('mouseenter', function () {
            $('.text-zone').attr('contenteditable', 'false');
        });
        link.off('mousemove').on('mousemove', function () {
            $('.text-zone').attr('contenteditable', 'false');
        });
        link.off('mouseleave').on('mouseleave', function () {
            $('.text-zone').attr('contenteditable', 'true');
            $(this).parent().focus();
        });
    }

    $('.btn').click(function () {
        if ($(this).attr('id') == 'link') {
            link();
        }
        else if ($(this).attr('id') == 'color-text') {
            document.execCommand('ForeColor', false, $('#color').val());
        }
        else if ($(this).attr('id') == 'title') {
            document.execCommand('formatBlock', false, 'H1');
        }
        else if ($(this).attr('id') == 'numeric-list') {
            document.execCommand('insertOrderedList');
        }
        else if ($(this).attr('id') == 'bullet-list') {
            document.execCommand('insertUnorderedList');
        }
        else {
            document.execCommand($(this).attr('id'));
        }
    });


    document.querySelector('#load_file').addEventListener('change', function () {

        var files = document.getElementById('load_file').files;

        if (!files.length) {
            alert('Please select a file!');
            return;
        }

        var file = files[0];

        console.log(file.type);

        var reader = new FileReader();

        reader.onloadend = function (evt) {
            document.getElementById('text-zone-1').textContent = evt.target.result;
        };

        reader.readAsBinaryString(file);

    }, false);


    var handleDrag = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    var handleDrop = function (e) {
        e.stopPropagation();
        e.preventDefault();
        x = e.clientX;
        y = e.clientY;
        var file = e.dataTransfer.files[0];
        if (file.type.match('image.*')) {
            var reader = new FileReader();
            reader.onload = (function (theFile) {
                var dataURI = theFile.target.result;
                var img = document.createElement("img");
                img.src = dataURI;
                img.style.maxWidth = document.getElementById('text-zone-1').offsetWidth - 220 + 'px';
                img.style.resize = 'both';
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
                else {
                    console.log('could not find carat');
                }


            });
            reader.readAsDataURL(file);
        }
    };

    var dropZone = document.getElementById('text-zone-1');
    dropZone.addEventListener('dragover', handleDrag, false);
    dropZone.addEventListener('drop', handleDrop, false);
});