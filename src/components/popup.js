export default class Popup {
    constructor(popup) {
        this._popup = popup;
        this._closeButton = popup.querySelector('.popup__close');
        this._overlay = popup.querySelector('.popup__popup-box');
        this._clickHandler = this.close.bind(this);
        this._overlayHandlerFunc = this._overlayHandler.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        this.setEventListeners();
    }

    _overlayHandler(e) {
        if (!e.target.classList.contains('popup__popup-box') && e.target.classList.contains('popup')) {
            this.close();
        }

    }
    setEventListeners() {
        document.addEventListener('keydown', this._handleEscClose.bind(this));        
        this._closeButton.addEventListener('click', this._clickHandler);
        this._popup.addEventListener('mousedown', this._overlayHandlerFunc);
    }

    

    close() {
        document.removeEventListener('keydown', this._handleEscClose);       
        this._closeButton.removeEventListener('click', this._clickHandler);
        this._popup.removeEventListener('mousedown', this._overlayHandlerFunc);
        this._popup.classList.remove('popup_opened');
        
       
        
        
    }

    _handleEscClose(event) {
        if (event.key === 'Escape' && this._popup.classList.contains('popup_opened')){
            this.close();
        }
    }
}
