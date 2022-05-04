
export default class Popup {
    constructor(popup) {
        this._popup = popup;
    }

    setEventListeners() {
        // привязываем через анонимную ф-цию контекст
        document.addEventListener('keydown',  (evt)=>{
          this._handleEscClose(evt);
        });
        this._popup.addEventListener('click', this.close);
    }

    open() {
        this.setEventListeners();
        this._popup.classList.add('popup_opened');
    }

    close(popup) {
      console.log(popup.classList);
        if (popup.classList.contains('popup_opened') && !popup.classList.contains('popup__popup-box')) {
          popup.classList.remove('popup_opened');
        }
        document.removeEventListener('keydown', this._handleEscClose);
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape' && this._popup.classList.contains('popup_opened')){
          console.log(this._popup);
          this.close(this._popup);
        }
    }
}
