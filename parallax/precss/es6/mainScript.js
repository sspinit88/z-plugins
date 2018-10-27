'use strict';
/*параллакс по движению курсора*/
window.addEventListener('load', function () {

    let parallaxConteiner = document.querySelector('#parallax'),
        layers = parallaxConteiner.children;

    parallaxConteiner.addEventListener('mousemove', moveLayers);

    function moveLayers(e) {
            // вычисляем позицию курсора
        let pageX = e.pageX,
            pageY = e.pageY,
            // вычисляем условный центр видемой зоны контейнера с параллаксом, отклонение положения курсора от условного центра.
            initialX = (window.innerWidth / 2) - pageX,
            initialY = (window.innerHeight / 2) - pageY;

                    //метод массива slice передаем в качестве this, перебираем элементы коллекции.
            // slice создает копию массива из перебранных элементов.
            [].slice.call(layers).forEach(function (layer, i) {
                    // divider - перемення (фоэффициент скорости движения слоя), в которую будет выводиться индекс эл-а в наборе, где значение будет делиться на 100.
                let divider = i / 100,
                    // вычисляем позицию i-го слоя относительно условного центра с учетом коэф. скорости движения слоя
                    positionX = initialX * divider,
                    positionY = initialY * divider,
                    // bottomPosition - переменная, с помощью которой решаем проблему выпадания слоев в нижней части контейнера. Рассчет проводится с учетом коэф. divider.
                    bottomPosition = (window.innerHeight / 2 ) * divider,
                    // сохраняем стили слоя в переменной
                    layerStyle = layer.style,
                    // задаем переменную , указывающую на сколько будем сдвигать слой по осям
                    transformString = 'translate3d(' +  positionX + 'px ,' +  positionY + 'px , 0)';

                    layerStyle.transform = transformString;
                    // убираем проблемы с выпадением слоев
                    layerStyle.bottom = '-' +  bottomPosition + 'px';
            });

    } // moveLayers

}); // load

/*-------------------------------------------------------------------------------------------------------------------*/

/*параллакс по скроллу*/
window.addEventListener('load', function () {

    let parallax = (function () {
        let bg = document.querySelector('.parallaxScrollJs__bg');
        let userText = document.querySelector('.parallaxScrollJs__text');
        let sectionText = document.querySelector('.parallaxScrollJs__section--img');

        /*возвращаем объект с публичными методами */
        return{
            /*заводим функцию move, которая будет двигать наши слои.
            В move передаем блок, который будем сдвигать, значение скролла,
            и передавать коэф, на который будем делить кол. пролистанных px,
            в зовисимости от этого будет меняться скорость смещения.*/
            move: function (block, windowScroll, strafeAmount) {
                // рассчитываем коэф. (минус берем, что бы эл-ты двигались в противоположную сторону относительно скролла
                let strafe = windowScroll / -strafeAmount + '%';

                let transformString = 'translate3d(0,' + strafe + ', 0)';

                let style = block.style;

                // смещаем блок
                // style.top = strafe;

                // а это позволяет сделать более плавную анимациюб переносим затраты на отрисовку на видиокарту
                style.transform = transformString;
                style.webkitTransform = transformString;
            },

            /*заводим публичный метод для сбора всех вызовов слоев*/
            init: function (wScroll) {
                this.move(bg, wScroll, 40);
                this.move(userText, wScroll, 10);
                this.move(sectionText, wScroll, 3);
            }
        }
    }());

    let blur = (function () {
       let wrapper = document.querySelector('.blur__form-wrapper'),
           form = document.querySelector('.blur__form');


       return{
           set: function () {
               /*ширина картинки в подложке*/
               let imgWidth = document.querySelector('.blur__background').offsetWidth;
               /*расстояние относительно родителя слева и сверху*/
               let posLeft = -wrapper.offsetLeft;
               let posTop = -wrapper.offsetTop;

               let blurCss = form.style;

               blurCss.backgroundSize = imgWidth + 'px' + ' ' + 'auto';
               /*обязательно вставлять пробел между данными по позиционированию, иначе стили не будут применены!*/
               blurCss.backgroundPosition = posLeft + 'px' + ' ' + posTop + 'px';
           }
       }
    }());

    let svgScroll = (function () {
        let svg = document.querySelector('#heisenberg'),
            svgPatchGroup = document.querySelectorAll('#heisenberg .group'),
            /*начало анимации зависит от расстояния до верхней границы окна c учетом отступа от него*/
            windowMargin = window.innerHeight / 3,
            /*положение svg*/
            svgRect = svg.getBoundingClientRect(),
            svgPos = svgRect.top;


        return{
            grow: function (wScroll) {
                let startAnimate = wScroll - svgPos + windowMargin,
                    pixelsElapsed = svgPos - wScroll,
                    percentsElapsed = 100 - Math.ceil(pixelsElapsed / windowMargin * 100),
                    percentsDraw = 1200 / 100 * percentsElapsed;

                if(startAnimate >= 0){
                    let drawAmount = 1200 - percentsDraw;

                    if(drawAmount > 0){
                        svgPatchGroup.forEach(function (item) {
                            item.style.strokeDashoffset = drawAmount;
                        })
                    }
                }
            },
        }
    }());

    blur.set();

    window.addEventListener('scroll', scrollPage);
    function scrollPage() {

    /*выясняем на сколько px проскроллена страница*/
        let wScroll = window.pageYOffset;

        parallax.init(wScroll);
        svgScroll.grow(wScroll);
    }

    window.addEventListener('resize', resizePage);
    function resizePage() {
        blur.set();
    }

}); // load



