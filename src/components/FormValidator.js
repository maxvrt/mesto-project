export default class FormValidator {
  constructor(config, formEl) {

    this._formSelector = config.formSelector;
    this._formItemSelector = config.formItemSelector;
    this._formButtonSelector = config.formButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._itemErrorClass = config.itemErrorClass;
    this._errorActiveClass = config.errorActiveClass;
    this._formEl = formEl;

    this._inputList = Array.from(this._formEl.querySelectorAll(this._formItemSelector));
    this._buttonElement = this._formEl.querySelector(this._formButtonSelector);
  }



  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };


  _disableButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.classList.remove('link');
    this._buttonElement.setAttribute('disabled', '');
  }

  _enableButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.classList.add('link');
    this._buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._disableButton(this._buttonElement);
    } else {
      this._enableButton(this._buttonElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formEl.querySelector(`.form__item-error_item_${inputElement.id}`);
    inputElement.classList.add(this._itemErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorActiveClass);
  };


  _hideInputError = (inputElement) => {
    const errorElement = this._formEl.querySelector(`.form__item-error_item_${inputElement.id}`);
    inputElement.classList.remove(this._itemErrorClass);
    errorElement.classList.remove(this._errorActiveClass);
    errorElement.textContent = '';
  };

  enableValidation() {

    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState();
      });
    });
  };


}


