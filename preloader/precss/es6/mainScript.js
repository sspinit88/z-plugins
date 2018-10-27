'use strict';

/*----preloader---*/

// ВАРИАНТ №1
// в html закоментить <!--<div class="preloader__percents">0 %</div>-->
// данная версия не показывает процент загрузки
// отключается, через 1 секунду, после того, как страница будет загружена

/*
window.addEventListener('load', function () {

    setTimeout(function () {
        let preloader = document.querySelector('.preloader');

        if (!preloader.classList.contains('done')){
            preloader.classList.add('done')
        }
    }, 1000)

}); // load
*/

// ВАРИАНТ №2
// с процентной загрузкой
// отслеживается загрузка картинок

let
    images           = document.images,
    imagesTotalCount = images.length,
    imagesLoadCount  = 0,
    percentDisplay   = document.querySelector('.preloader__percents'),
    preloader        = document.querySelector('.preloader');

// перебираем все изображения
    for (let i = 0; i < imagesTotalCount; i++){
        // создаем клон изображений
        let imageClone = new Image();
        // imageLoaded() будет вызвана, когда все изображения загрузятся
        imageClone.onload = imageLoaded;
        imageClone.onerror = imageLoaded;
        imageClone.src = images[i].src;
    }

function imageLoaded() {
    // imageLoaded() отвечает за то, что бы увеличить кол общих загруженных изображений, рассчитать % и вывести на страницу, затем скрыть прелоадер
    imagesLoadCount++;
    percentDisplay.innerHTML = (((100 / imagesTotalCount) * imagesLoadCount) << 0) + '%';

    if(imagesLoadCount >= imagesTotalCount){
        setTimeout(function () {
            if (!preloader.classList.contains('done')){
                preloader.classList.add('done')
            }
        }, 1000)
    }
} // imageLoaded()




