$(function(){   
    $('#shop_ip').on('click',  function(){
        var btn = $(this).val('...').prop('disabled', true);
        
        /* 
            string -> GET
            obj -> POST
        */
        $('#myip').load('ip.php', '', function(data, status, xhr){
            btn.val('Показать мой IP').prop('disabled', false);
            
            if(status === 'error'){
                $('#myip').html('Ошибка сервере - ' + xhr.status);
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