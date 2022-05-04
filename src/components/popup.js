export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._closeButton = popup.querySelector('.popup__close');
        this._overlay = popup.querySelector('.popup__popup-box');
    
        
    }


    open() {
        this._popup.classList.add('popup_opened');
    }
    

    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));
        this._closeButton.addEventListener('click', this.close.bind(this));
        this._popup.addEventListener('click', (e) => {
            if (!e.target.classList.contains('popup__popup-box')) {
                this.close();
            }
        });
    }

    

    close() {
        
        this._popup.classList.remove('popup_opened');     
        
    }

    _handleEscClose(event) {
        if (event.key === 'Escape' && this._popup.classList.contains('popup_opened')){
            this.close();
        }
          
    }
}