import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
  }
  open(imgElement, imgDescElement, imgValue, altValue) {
    super.open();
    imgElement.setAttribute('src', imgValue);
    imgElement.setAttribute('alt', altValue);
    imgDescElement.textContent = altValue;
  }
  // fillPopupImg(imgElement, imgDescElement, imgValue, altValue) {
  //   imgElement.setAttribute('src', imgValue);
  //   imgElement.setAttribute('alt', altValue);
  //   imgDescElement.textContent = altValue;
  // }
}
