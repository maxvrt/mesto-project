import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, {apiCallBack}) {
        super(popup);
        this._form = this._popup.querySelector('.form');
        this._inputs = Array.from(this._form.querySelectorAll('.form__item'));
        this._apiCallBack = apiCallBack;
        this._submitHandler = this._submit.bind(this);

    }

    setInputValues(userData) {
        this._inputs[0].value = userData.name;
        this._inputs[1].value = userData.about;
    }

    open() {
        super.open();        
    }



    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitHandler);

    }

    _getInputValues() {
        const formData = {};

        this._inputs.forEach((input) => {
            console.log(input.name);
            console.log(input.value);
            formData[input.name] = input.value;
        })

        return formData;
    }

    _submit(event) {
        event.preventDefault();
        const data = this._getInputValues();
        this._apiCallBack(data);


    }


    close() {
        super.close();
        this._form.reset();
        this._form.removeEventListener('submit', this._submitHandler);

    }
}
