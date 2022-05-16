import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup, imgElement, imgDescElement) {
    super(popup);
    this._imgElement = imgElement;
    this._imgDescElement = imgDescElement;
  }
  open(imgValue, altValue) {
    super.open();
    this._imgElement.setAttribute('src', imgValue);
    this._imgElement.setAttribute('alt', altValue);
    this._imgDescElement.textContent = altValue;
  }
  // fillPopupImg(imgElement, imgDescElement, imgValue, altValue) {
  //   imgElement.setAttribute('src', imgValue);
  //   imgElement.setAttribute('alt', altValue);
  //   imgDescElement.textContent = altValue;
  // }
}
