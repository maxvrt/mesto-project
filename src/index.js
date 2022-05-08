import '../node_modules/core-js/stable';
import '../node_modules/regenerator-runtime/runtime'
import './pages/index.css';

import Validation from './components/validate.js';

//UserInfo

import {userInfoSelectors} from './components/constants.js';

import UserInfo from './components/userInfo.js';
import { validConfig } from './components/validConfig.js';

import { renderButtonLoading } from './components/modal.js';
import { imgPopup, profilePopup, photosGrid, profileModalOpenButton, placePopup, placeModalOpenButton, avatar, avatarModalOpenButton,avatarPopup, apiConfig, imgDescElement, imgElement,} from './components/constants.js'
import Section from './components/section';

import { Card } from './components/card.js';
import Api from './components/api.js';
import PopupWithImage from './components/popupImg.js';
import PopupWithForm from './components/popupwithform.js';




const api = new Api(apiConfig);

const user = new UserInfo({
  data: userInfoSelectors,

  apiCallBack: () => {

    return api.getUser()

  }
}, avatar);

let userId = '';


// Пользователь
user.getUserInfo().then((user) => {
  console.log(user + ' - user._id');
  userId = user._id;
  return userId
  //user.setUserInfo()
}).then((userId) => {
  console.log(userId + ' - userId после назначения');
  // Вывод карточек
  api.getCards().then((data) => {
    const cardsList = new Section({
      cardData: data,
      renderer: (cardItem) => {
        const card = new Card(cardItem, userId, '#card-template');
        // Элемент верстки
        const cardElement = card.generate();
        // Есть ли лайк пользователя
        const isLike = card.checkUserLike();
        if (isLike) cardElement.querySelector('.photos-grid__heart').classList.add('photos-grid__heart_active');
        // Слушатели удаления, лайка и открытия картинки у карточки
        const cardId = card.getId();
        const cardImg = card.getImg();
        const heartButton = cardElement.querySelector('.photos-grid__heart');
        const delButton = cardElement.querySelector('.photos-grid__delete');
        const likeElement = heartButton.parentNode.querySelector('.photos-grid__heart-counter');
        delButton.addEventListener('click', () => {
          api.delCardById(cardId).then(() => {
            card.delCard(delButton);
          }).catch(err => catchError(err));
        });
        heartButton.addEventListener('click', () => {
          heartButton.classList.toggle('photos-grid__heart_active');
          if (heartButton.classList.contains('photos-grid__heart_active')) {
            api.likeCardById(cardId).then((data) => {
              card.addLike(likeElement, data.likes.length);
            }).catch(err => catchError(err));
          } else {
            api.delLikeCardById(cardId).then((data) => {
              card.addLike(likeElement, data.likes.length);
            }).catch(err => catchError(err));
          }
        });
        cardImg.addEventListener('click', () => {
          console.log(cardImg.getAttribute('alt'));
          const imgPopupObj = new PopupWithImage(cardImg.getAttribute('src'), cardImg.getAttribute('alt'), imgPopup);
          imgPopupObj.fillPopupImg(imgElement, imgDescElement);
          imgPopupObj.open();
        });
        //console.log(cardElement);
        //! Вывод карточек
        cardsList.setItemAll(cardElement);
      },
    }, photosGrid);
    cardsList.renderItems();
  }
  ).catch(err => api.catchError(err));

}).catch(err => api.catchError(err));



// Слушатели
// Профиль

profileModalOpenButton.addEventListener('click', () => {

  const profilePopupEl = new PopupWithForm(profilePopup, {apiCallBack: (data) => {


  const profilePopupEl = new PopupWithForm(profilePopup, {
    apiCallBack: (data) => {



      if (!data) {

        return user.getValues();

      } else if (data.formName === 'profile-info') {
        renderButtonLoading(true, profilePopup);


        api.patchUser(data.data[0].value, data.data[1].value).then(data => {
          user.setUserInfo(data.name, data.about, false);
        })
          .finally(data => {
            renderButtonLoading(false, profilePopup);
          })
      }

    }
  });

  profilePopupEl.open();


});

// Окно добавления аватара

avatarModalOpenButton.addEventListener('click', () => {

  const avatarPopupEl = new PopupWithForm(avatarPopup, {apiCallBack: (data) => {
    renderButtonLoading(true, avatarPopup);
    if (data.formName === 'avatar-info') {
      api.patchAvatar(data.data[0].value).then(res => {
        api.getUser().then(res => {
          user.setUserInfo(false, false, res.avatar);
        })

      })
      .catch(err => api.catchError(err))
      .finally(res => {
        renderButtonLoading(false, avatarPopup);
      })

    }
  });
  avatarPopupEl.open();
});

// Окно добавления карточки
placeModalOpenButton.addEventListener('click', () => {

  const placePopupEl = new PopupWithForm(placePopup, {apiCallBack: (data) => {
    renderButtonLoading(true, placePopup);
    if (data.formName === 'place-info') {
      api.postCard(data.data[1].value, data.data[0].value).then(data => {

        const cardSection = new Section({
          cardData: data,
          renderer: () => {
            console.log(data);
            const card = new Card(data, userId, '#card-template');
            const cardElement = card.generate();
            const cardId = card.getId();
            const cardImg = card.getImg();
            const heartButton = cardElement.querySelector('.photos-grid__heart');
            const delButton = cardElement.querySelector('.photos-grid__delete');
            const likeElement = heartButton.parentNode.querySelector('.photos-grid__heart-counter');
            delButton.addEventListener('click',  () => {
              api.delCardById(cardId).then(() => {
                card.delCard(delButton);
              }).catch(err => catchError(err));
            });
            heartButton.addEventListener('click',  () => {
              heartButton.classList.toggle('photos-grid__heart_active');
              if (heartButton.classList.contains('photos-grid__heart_active')){
                api.likeCardById(cardId).then((data) => {
                  card.addLike(likeElement, data.likes.length);
                }).catch(err => catchError(err));
              } else {
                api.delLikeCardById(cardId).then((data) => {
                  card.addLike(likeElement, data.likes.length);
                }).catch(err => catchError(err));
              }
            });
            cardImg.addEventListener('click', () => {
              console.log(cardImg.getAttribute('alt'));
              const imgPopupObj = new PopupWithImage(cardImg.getAttribute('src'), cardImg.getAttribute('alt'), imgPopup);
              imgPopupObj.fillPopupImg(imgElement, imgDescElement);
              imgPopupObj.open();
            });
            console.log(cardElement);
            cardSection.setItem(cardElement);
          },
        }, photosGrid);
        cardSection.renderItems();
      })
      .catch(err => api.catchError(err))
      .finally(res => {
        renderButtonLoading(false, placePopup);
      })
    }

  }});

  placePopupEl.open();
});

//New OOP validation
const formList = Array.from(document.querySelectorAll(validConfig.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const validation = new Validation(validConfig, formElement);
  validation.enableValidation();
});
