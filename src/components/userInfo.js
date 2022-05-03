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

        return this._apiCallBack(false, false, false);
    }
    setUserInfo(name, about, avatarLink) {
        if (name && about) {
            this._apiCallBack(name, about, false).then(data => {
                this._nameEl.textContent = data.name;
                this._aboutEl.textContent = data.about;
            })
          } else if (avatarLink) {
            this._apiCallBack(false, false, avatarLink).then(data => {
                this._avatarEl.setAttribute("src", data.avatar);
            })
          } else {
              this.getUserInfo()
              .then(user => {
                this._nameEl.textContent = user.name;
                this._aboutEl.textContent = user.about;
                this._avatarEl.setAttribute("src", user.avatar);
              })
          }
    }
}



