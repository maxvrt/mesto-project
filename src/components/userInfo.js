import {avatar} from './constants.js';
//import { Api } from './components/api.js';



class UserInfo extends Api{
    constructor(userSelectors) {
        this._nameElement = document.querySelector(userSelectors.nameSelector);
        this._aboutElement = document.querySelector(userSelectors.aboutSelector);
    }

    //rename to 'getUserInfo' here and in api.js
    getUser() {
        super.getUser().then(res => {
            this._nameElement.textContent = res.name;
            this._aboutElement.textContent = res.about;
            avatar.setAttribute("src", user.avatar);
        })
    }

    //ver1 
    //rename to 'setUserInfo' here and in api.js
    /*
    patchUser(name, about) {
        super.patchUser(name, about);
        this._nameElement.textContent = name;
        this._aboutElement = about;
        
    } */

    //ver2
    // Call this @ Api patchUser method from popupwithform class item
    setUserInfo(name, about) {
        this._nameElement.textContent = name;
        this._aboutElement = about;
    }

}

export default UserInfo;