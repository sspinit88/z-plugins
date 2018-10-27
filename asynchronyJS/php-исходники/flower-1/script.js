window.onload = function(){   
    document.querySelector('#shop_ip').onclick = function(){
        var btn = this;
        btn.value = '...';
        btn.disabled = true;
        
        ajaxGet('ip.php', function(data){
            document.querySelector('#myip').innerHTML = data;
        }, function(code){
            document.querySelector('#myip').innerHTML = 'Ошибка ответа от сервера: ' + code;
        }, function(){
            btn.value = 'Показать мой IP';
            btn.disabled = false;
        });
    } 
}

function ajaxGet(url, success, error, complete){
    var f_success = success || function(data){};
    var f_error = error || function(code){};
    var f_complete = complete || function(){};
    
    var request = new XMLHttpRequest();
    
    request.onreadystatechange = function(){
        if(request.readyState == 4){
            switch(request.status){
                case 200:
                    f_success(request.responseText);
                    break;
                default:
                    f_error(request.status);
            }
            
            f_complete();
        }
    }
    
    request.open('GET', url);
    request.send();
}

