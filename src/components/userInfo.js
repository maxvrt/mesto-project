export default class UserInfo {
    constructor({data, apiCallBack}, avatarEl) {
        this._nameEl = document.querySelector(data.nameSelector);
        this._aboutEl = document.querySelector(data.aboutSelector);
        this._avatarEl = avatarEl;
        this._apiCallBack = apiCallBack;

    }
    getUserInfo() {

        return this._apiCallBack(false, false, false)
        .then(user => {
          this.setUserInfo(user.name, user.about, user.avatar);
          return user;
        })

        //this._apiCallBack(false, false, false);
    }
    setUserInfo(name, about, avatarLink) {

        if (name) {

            this._nameEl.textContent = name;


        }

        if (about) {
            this._aboutEl.textContent = about;
        }
        if (avatarLink) {

            this._avatarEl.setAttribute("src", avatarLink);
        }


    }
}
