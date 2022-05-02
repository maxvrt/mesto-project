import { nameInput, jobInput } from "./constants.js";


//Первая версия. В ближайшие дни попробую переписать с одним колбеком и асинхронными методами
export default class UserInfo {
    constructor({data, apiGetUser, apiSetUser, apiSetAvatar}, avatarEl) {
      this._nameEl = document.querySelector(data.nameSelector);
      this._aboutEl = document.querySelector(data.aboutSelector);
      this._avatarEl = avatarEl;
      this._apiGetUser = apiGetUser;
      this._apiSetUser = apiSetUser;
      this._apiSetAvatar = apiSetAvatar;
    }
    
    getUserInfo() {
      this._apiGetUser()
      .then(user => {
        this._nameEl.textContent = user.name;
        this._aboutEl.textContent = user.about;
        this._avatarEl.setAttribute("src", user.avatar);
      })
    }

    setUserInfo(name, about, avatarLink) {
      if (name && about) {
        this._apiSetUser(name, about, false).then(data => {
            this._nameEl.textContent = data.name;
            this._aboutEl.textContent = data.about;
        })
      } else if (avatarLink) {
        this._apiSetAvatar(avatarLink).then(data => {
            this._avatarEl.setAttribute("src", data.avatar);
        })
      }
    }
}

