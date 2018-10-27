'use strict';
// ajax # 00
window.addEventListener('load', function () {

    let btn = document.querySelector('#send'),
        result = document.querySelector('#result'),
        btn2 = document.querySelector('#sends');


    // без promise
    btn.addEventListener('click', () => {
        /*
            Данный API предоставляет простой способ получения данных по ссылке без перезагрузки страницы.
            Это позволяет обновлять только часть веб-страницы не прерывая пользователя.
         */
        let xhr = new XMLHttpRequest();
        /*
            метод open() готовит соединение.
            1й параметр - метод, которым отправляем запрос,
            2й параметр - url, куда отправляем запрос.
        */
        xhr.open('GET', 'text.txt');
        xhr.send();
        /*
            вывод содержимого файла на страницу
        */
        xhr.addEventListener('load', ()=> {
            /*проверка на ошибки*/
            if (xhr.status >= 400){
                result.innerHTML = 'Сервер не дает ответ на Ваш запрос.';
            }
            else {
                result.innerHTML = xhr.response;
            }
        });

    });

    // promise
    function loadFile(url) {
        return new Promise(function (res, rej) {

            let xhr = new XMLHttpRequest();

            xhr.open('GET', url);
            xhr.send();

            xhr.addEventListener('load', () => {

                if(xhr.status >= 400){
                    rej(xhr.status);
                }
                else{
                    res(xhr.response);
                }

            });
            xhr.addEventListener('error', () => {
                rej(xhr.status);
            })
        })
    } // loadFile

    btn2.addEventListener('click', () => {

        loadFile('text.txt').then( function (value) {

            result.innerHTML = value;
            return loadFile('text2.txt');

        })
            .then(function ( value) {

                result.innerHTML += value;

            })
            .catch(function (status) {

                console.error('код ответа', status);

            });

    }); // click

});

// ajax #0
// отправка ajax запроса методом GET
window.addEventListener('load', function () {

   
}); // load