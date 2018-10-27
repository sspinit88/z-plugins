window.onload = function(){   
    document.querySelector('#shop_ip').onclick = function(){
        var btn = this;
        btn.value = '...';
        btn.disabled = true;
        
        ajaxGet({
            url: 'ip.php', 
            success: function(data){
                document.querySelector('#myip').innerHTML = data;
            },
            error: function(code){
                document.querySelector('#myip').innerHTML = 'Ошибка ответа от сервера: ' + code;
            }, 
            complete: function(){
                btn.value = 'Показать мой IP';
                btn.disabled = false;
            },
            timeout: 5
        });
    } 
}

function ajaxGet(options){
    var params = {
        url: '',
        success: function(data){},
        error: function(code){},
        complete: function(){},
        timeout: 30
        /*
            method
            params for method
        */
    };
    
    for(key in params){
        if(options[key] !== undefined){
            params[key] = options[key];
        }
    }
    
    var request = new XMLHttpRequest();
    
    var timeout = setTimeout(function(){
        request.abort();
        params.error('timeout');
        params.complete();
    }, params.timeout * 1000);
    
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            clearTimeout(timeout);
            
            switch(request.status){
                case 200:
                    params.success(request.responseText);
                    break;
                default:
                    params.error(request.status);
            }
            
            params.complete();
        }
    }
    
    request.open('GET', params.url);
    request.send();
}

