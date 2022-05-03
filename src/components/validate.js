
/*
const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, config);
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

// Массив полей формы
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
	  return !inputElement.validity.valid;
  })
};
// Активация и деактивация кнопки
function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.classList.remove('link');
  buttonElement.setAttribute('disabled', '');
}
function enableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.classList.add('link');
  buttonElement.removeAttribute('disabled');
}
// Изменение кнопки сабмита
const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, config.inactiveButtonClass);
  } else {
    enableButton(buttonElement, config.inactiveButtonClass);
  }
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.form__item-error_item_${inputElement.id}`);
  inputElement.classList.add(config.itemErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorActiveClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.form__item-error_item_${inputElement.id}`);
  inputElement.classList.remove(config.itemErrorClass);
  errorElement.classList.remove(config.errorActiveClass);
  errorElement.textContent = '';
};

// Слушатели полей внутри формы
const setEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.formItemSelector));
  const buttonElement = formElement.querySelector(config.formButtonSelector);
  toggleButtonState(inputList, buttonElement, config);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
       isValid(formElement, inputElement, config);
       toggleButtonState(inputList, buttonElement, config);
    });
  });
};

// Валидация все формы
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    // Для каждой формы вызовем функцию setEventListeners
    setEventListeners(formElement, config);
  });
};

export {enableValidation, disableButton, enableButton};
*/


class Validation {
  constructor(config, formEl) {
  
    this._formSelector = config.formSelector;
    this._formItemSelector = config.formItemSelector;
    this._formButtonSelector = config.formButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._itemErrorClass = config.itemErrorClass;
    this._errorActiveClass = config.errorActiveClass;
    this._formEl = formEl;
  }



  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  };


  _disableButton(buttonElement) {
    buttonElement.classList.add(this._inactiveButtonClass);
    buttonElement.classList.remove('link');
    buttonElement.setAttribute('disabled', '');
  }

  _enableButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveButtonClass);
    buttonElement.classList.add('link');
    buttonElement.removeAttribute('disabled');
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    } else {
      this._enableButton(buttonElement);
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
    const inputList = Array.from(this._formEl.querySelectorAll(this._formItemSelector));
    const buttonElement = this._formEl.querySelector(this._formButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };


}


export default Validation;