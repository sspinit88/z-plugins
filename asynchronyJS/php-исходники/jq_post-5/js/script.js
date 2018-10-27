$(function(){   
    $('#send').on('click',  function(){
        var btn = $(this).prop('disabled', true);
        var form = btn.parent();
        
        $.post('app.php', form.serialize(), function(data){
            if(data === '1'){
                $('#result').html('Ура! Ожидайте звонка!');
                form.slideUp(); 
            }
            else{
                $('#result').html(data);
            }
        })
        .fail(function(xhr) {
            alert('error - ' + xhr.status);
        })
        .always(function() {
            btn.prop('disabled', false);
        });
        
    });
});

/* 
    $.ajax - самая гибкая
    $().load - самая короткая
    $.get
    $.post
*/