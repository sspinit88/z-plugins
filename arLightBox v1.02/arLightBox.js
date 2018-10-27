
"use strict";

class arLightBox {

    constructor(){
        this.arLight = document.querySelector('#arLightBox');
        this.linkClick = document.querySelectorAll('#arLightBox a[data-arLight]');


        this._arrLeft = null;
        this._arrRight = null;
        this._img = null;
        this._globalContainer = null;
        this._clicIndex = null;
        this._btnClose = null;


        this._delayer = this.delay();
        this.getImgLength();

        this.createElements();

        this.globalContainer = document.querySelector('.containerArLight');
        this._imgReady = document.querySelectorAll('.containerArLight__img');
        this._btnClose = document.querySelectorAll('.containerArLight__btnClose');


        for(let i = 0; i < this.linkClick.length; i++){
            this.linkClick[i].addEventListener('click', (e) => {
                e.preventDefault();
                this._clicIndex = i;
                this.onEvent(this._clicIndex);
            })
        }

        this.arLight.addEventListener('click', this.moveOn.bind(this));

    } /*constructor*/

    /*общие методы*/
    createElements(){
        this.createContainerLightBox();
        this.createArrBtn();
        this.createBtnClose();
    }

    onEvent(indexImgClicked){
        this.showContainerLightBox();
        this.showFirstImg(indexImgClicked)
    }

    delay(){
        let timer;
        return function (setFunction, timeOut) {
            clearTimeout(timer);
            timer = setTimeout(setFunction, timeOut)
        }
    }

    getImgLength() {
        return this.linkClick.length;
    }

    /*метлоды создания элементов*/

    createContainerLightBox(){

        let img = this.linkClick;

        if ( img.length > 0){

            this._globalContainer = document.createElement('div');
            this._globalContainer.classList.add('containerArLight');

            for(let i = 0; i < img.length; i++){
                this._img = document.createElement('img');
                this._img.src = img[i];
                this._img.classList.add('containerArLight__img');

                this._globalContainer.appendChild(this._img);
            }

            this.arLight.appendChild(this._globalContainer);

        } else {
            return false
        }

    }

    createArrBtn() {
        this._arrLeft = document.createElement('div');
        this._arrLeft.classList.add('containerArLight__btnLeft');

        this._arrRight = document.createElement('div');
        this._arrRight.classList.add('containerArLight__btnRight');

        this._globalContainer.appendChild(this._arrLeft);
        this._globalContainer.appendChild(this._arrRight);
    }

    createBtnClose(){
        this._btnClose = document.createElement('div');
        this._btnClose.classList.add('containerArLight__btnClose');
        this._globalContainer.appendChild(this._btnClose);
    }

    /*методы действия*/
    moveOn(e){
        let clickElement = e.target;

        if(clickElement.classList.contains('containerArLight__btnClose')){
            this.hideContainerLightBox();
        }
        else if(clickElement.classList.contains('containerArLight__btnRight')){
            this.moveRight();
        }
        else if(clickElement.classList.contains('containerArLight__btnLeft')){
            this.moveLeft();
        }
    }

    showFirstImg(indexImgClicked){
        let indexImg = indexImgClicked;

        if(typeof indexImg !== isNaN){
            return this._imgReady[indexImg].classList.add('active');
        } else {
            return this._imgReady[0].classList.add('active');
        }
    }

    showContainerLightBox(){
        let globalContainer = this.globalContainer;

        globalContainer.classList.add('active');

        this._delayer(() => {
            globalContainer.classList.add('show');
        }, 300);
    }

    hideContainerLightBox(){
        let globalContainer = this.globalContainer;

        globalContainer.classList.remove('show');

        this._delayer(() => {
            globalContainer.classList.remove('active');
        }, 1000);
    }

    moveRight(){
        let toHide = this._imgReady[this._clicIndex];

        this._clicIndex++;

        if(this._clicIndex >= this._imgReady.length){
            this._clicIndex = 0;
        }

        this.switchEffect(toHide, this._imgReady[this._clicIndex]);

        console.log(this._clicIndex);
    }

    moveLeft(){
        let toHide = this._imgReady[this._clicIndex];

        this._clicIndex--;

        if(this._clicIndex < 0){
            this._clicIndex = this._imgReady.length - 1 ;
        }

        this.switchEffect(toHide, this._imgReady[this._clicIndex]);
    }

    switchEffect(toHide, toShow) {
        toHide.classList.remove('active');
        toShow.classList.add('active');
    }

}