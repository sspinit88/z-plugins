$(function(){   
    $('#send').on('click',  function(){
        var btn = $(this).prop('disabled', true);
        var form = btn.parent();
        
        $.ajax({
            url: 'app.php',
            method: 'POST',
            data: form.serialize(),
            success: function(data){
                if(data === '1'){
                    $('#result').html('Ура! Ожидайте звонка!');
                    form.slideUp(); 
                }
                else{
                    $('#result').html(data);
                }
            },
            error: function(xhr) {
                alert('error - ' + xhr.status);
            },
            complete: function() {
                btn.prop('disabled', false);
            }
        });
        
    });
});

/* 
    $.ajax - самая гибкая
    $().load - самая короткая
    $.get
    $.post
*/