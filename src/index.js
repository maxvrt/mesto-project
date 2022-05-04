import '../node_modules/core-js/stable';
import '../node_modules/regenerator-runtime/runtime'
import './pages/index.css';

import Validation from './components/validate.js';

//Userinfo
import {jobInput, userInfoSelectors} from './components/constants.js';
import UserInfo from './components/userInfo.js';

import { renderCard } from './components/cards.js';
import { validConfig } from './components/validConfig.js';
import { closeModal, openModal, fillModalImg, openModalProfile, addCardFromForm, handleFormProfileSubmit, closeModalOverlay, avatarSubmit, renderButtonLoading } from './components/modal.js';
import { avatarInput, imgPopup, profileFormElement, profilePopup, photosGrid, imgModalButtonClose, profileModalCloseButton, profileModalOpenButton, placeFormElement, placePopup, placeModalOpenButton, placeModalCloseButton, profileName, avatar, profileDesc, avatarFormElement, avatarModalOpenButton, avatarModalCloseButton, avatarPopup, apiConfig, nameInput, JobInput} from './components/constants.js'
import Section from './components/section'; //import { renderCard } from './components/cards.js';
import { Card } from './components/card.js';
import Api from './components/api.js';


import Popup from './components/popup.js';




const api = new Api(apiConfig);

const user = new UserInfo({
  data: userInfoSelectors,
  apiCallBack: (name, about, avatarLink) => {
    if (name && about) {
      return api.patchUser(name, about)
    } else if (avatarLink) {
      return api.patchAvatar(avatarLink)
        
    } else {
      return api.getUser()
    }
  }
}, avatar);

user.setUserInfo();



// Пользователь

user.getUserInfo().then((user) => {
  console.log(user + ' - user._id');
  const userId = user._id;
  return userId
//user.setUserInfo()
}).then((userId)=>{
  console.log(userId+ ' - userId после назначения');
  // Вывод карточек
  api.getCards().then((data) => {
    const cardsList = new Section({
      cardListData: data,
      renderer: (cardItem) => {
        const card = new Card(cardItem, userId, '#card-template');
        // Элемент верстки
        const cardElement = card.generate();
        // Есть ли лайк пользователя
        const isLike = card.checkUserLike();
        if(isLike) cardElement.querySelector('.photos-grid__heart').classList.add('photos-grid__heart_active');
        // Слушатели удаления, лайка и открытия картинки у карточки
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
          const imgSrc = cardImg.getAttribute('src');
          const imgAlt = cardImg.getAttribute('alt');
          fillModalImg(imgSrc, imgAlt);
          openModal(imgPopup);
        });
        //console.log(cardElement);
        //! Вывод карточек
        cardsList.setItem(cardElement);
      },
    }, photosGrid);
    cardsList.renderItems();
  }
  ).catch(err => api.catchError(err));

}).catch(err => api.catchError(err));




console.log(profilePopup);

// Слушатели
// Профиль
//profileModalCloseButton.addEventListener('click', () => {closeModal(profilePopup)});
profileModalOpenButton.addEventListener('click', () => {
  
  
  const profilePopupEl = new Popup(profilePopup);
  profilePopupEl.open();
  profilePopupEl.setEventListeners();


});

profileFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderButtonLoading(true, profilePopup);
  user.setUserInfo(nameInput.value, jobInput.value, false);
  closeModal(profilePopup);
});
// Окно добавления аватара
//avatarModalCloseButton.addEventListener('click', () => {closeModal(avatarPopup)});
avatarModalOpenButton.addEventListener('click', () => {
  const avatarPopupEl = new Popup(avatarPopup);
  avatarPopupEl.open();
  avatarPopupEl.setEventListeners();
});


avatarFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault()
  renderButtonLoading(true, avatarPopup);
  user.setUserInfo(false, false, avatarInput.value);
  closeModal(avatarPopup);
});

// Окно добавления карточки
//placeModalCloseButton.addEventListener('click', () => {closeModal(placePopup)});
placeModalOpenButton.addEventListener('click', () => {
  const placePopupEl = new Popup(placePopup);
  placePopupEl.open();
  placePopupEl.setEventListeners();
});
placeFormElement.addEventListener('submit', addCardFromForm);
// Открытие-закрытие модального окна картинки
imgModalButtonClose.addEventListener('click', () => { closeModal(imgPopup) });
// Закрытие модальных окон
//profilePopup.addEventListener('click', evt => {closeModalOverlay(evt, profilePopup)});
//placePopup.addEventListener('click', evt => {closeModalOverlay(evt, placePopup)});
//imgPopup.addEventListener('click', evt => {closeModalOverlay(evt, imgPopup)});
//avatarPopup.addEventListener('click', evt => {closeModalOverlay(evt, avatarPopup)});



//New OOP validation

const formList = Array.from(document.querySelectorAll(validConfig.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const validation = new Validation(validConfig, formElement);
  validation.enableValidation();
});





