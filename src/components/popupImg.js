import Popup from './popup.js'

export default class PopupWithImage extends Popup {
  constructor(imgValue, altValue, popup) {
    super(popup);
    this._imgValue = imgValue;
    this._altValue = altValue;
  }
  fillPopupImg(imgElement, imgDescElement) {
    imgElement.setAttribute('src', this._imgValue);
    imgElement.setAttribute('alt', this._altValue);
    imgDescElement.textContent = this._altValue;
  }
}
