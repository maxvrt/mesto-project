import { nameInput, jobInput } from "./constants.js";


//Первая версия. В ближайшие дни попробую переписать с одним колбеком и асинхронными методами
export default class UserInfo {
    constructor({data, apiCallBack}, avatarEl) {
        this._nameEl = document.querySelector(data.nameSelector);
        this._aboutEl = document.querySelector(data.aboutSelector);
        this._avatarEl = avatarEl;
        this._apiCallBack = apiCallBack;
       
    }
    getUserInfo() {

        this._apiCallBack(false, false, false)
        .then(user => {

            this.setUserInfo(user.name, user.about, user.avatar);
        })
    }
    setUserInfo(name, about, avatarLink) {
        
        if (name && about && !avatarLink) {
            
                this._nameEl.textContent = name;
                this._aboutEl.textContent = about;
            
          } else if (avatarLink && !name || !about) {
            
                this._avatarEl.setAttribute("src", avatarLink);
            
          } else if (name && about && avatarLink) {
                this._nameEl.textContent = name;
                this._aboutEl.textContent = about;
                this._avatarEl.setAttribute("src", avatarLink);
          }
    }
}



