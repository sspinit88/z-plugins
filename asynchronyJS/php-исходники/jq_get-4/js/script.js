$(function(){   
    $('#shop_ip').on('click',  function(){
        var btn = $(this).val('...').prop('disabled', true);
        
        $.get('ip.php', {}, function(data){
            $('#myip').html(data);
        })
        .fail(function(xhr) {
            $('#myip').html('Ошибка ответа от сервера - ' + xhr.status);
        })
        .always(function() {
            btn.val('Показать мой IP').prop('disabled', false);
        });
        
    });
});

/* 
    $.ajax - самая гибкая
    $().load - самая короткая
    $.get
    $.post
*/