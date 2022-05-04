import Popup from './popup.js';

export default class PopupWithForm extends Popup {
    constructor(popup, {apiCallBack}) {
        super(popup);
        this._form = this._popup.querySelector('.form');
        this._apiCallBack = apiCallBack;
    }

    open() {
        super.open();
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            this._apiCallBack(this._getInputValues().bind(this));
            this.close();
        });

    }

    _getInputValues() {
        

        if (this._form.name === 'profile-info') {
            const profileData = {
                formName: 'profile-info',
                userName: this._form.elements.name.value,
                about: this._form.elements.desc.value,
            }

            return profileData;

        } else if (this._form.name === 'place-info') {
            const placeData = {
                formName: 'place-info',
                placeName: this._form.elements.place.value,
                placeLink: this._form.elements.img-place.value,
            }

            return placeData;
        } else if (this._form.name === 'avatar-info') {
            const avatarData = {
                formName: 'avatar-info',
                avatarLink: this._form.elements.avatar.value,
            }

            return avatarData;
        }
    }


    close() {
        super.close();
        this._form.reset();

    }
}