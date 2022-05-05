import Popup from './popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, {apiCallBack}) {
        super(popup);
        this._form = this._popup.querySelector('.form');
        this._inputs = Array.from(this._form.querySelectorAll('.form__item'));
        this._apiCallBack = apiCallBack;
    }

    open() {
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            const data = this._getInputValues();
            this._apiCallBack(data);
            this.close();
        });

    }

    _getInputValues() {
        const formData = {
            formName: this._form.getAttribute('name'),
            data: this._inputs,
        }

        return formData;
    }


    close() {
        super.close();
        this._form.reset();

    }
}