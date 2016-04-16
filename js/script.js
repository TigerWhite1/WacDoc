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
});
