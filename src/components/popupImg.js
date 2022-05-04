import Popup from "./popup";

export default class PopupWithImage extends Popup {
  constructor(imgValue, altValue, popup) {
    super(popup);
    this._imgValue = imgValue;
    this._altValue = altValue;
  }
  fillPopupImg(imgElement, imgDescElement) {
    imgElement.setAttribute('src', this._imgValue);
    imgElement.setAttribute('alt', this._altValue);
    imgDescElement.textContent = altValue;
  }
}

// class Popup {
//   constructor(popup) {
//       this._popup = popup;
//   }

//   setEventListeners() {
//       document.addEventListener('keydown', this._handleEscClose);
//       this._popup.addEventListener('click', this.close);
//   }

//   open() {
//       this.setEventListeners();
//       this._popup.classList.add('popup_opened');
//   }

//   close(evt) {
//       if (evt.target.classlist.contains('popup__popup-box') || evt.target.classlist.contains('popup__close')) {
//           this._popup.classList.remove('popup_opened');
//       }
//       document.removeEventListener('keydown', this._handleEscClose);
//   }

//   _handleEscClose() {
//       if (evt.key === 'Escape' && this._popup.classList.contains('popup_opened')){
//             this.close();
//       }

//   }
// }
