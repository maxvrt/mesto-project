import '../node_modules/core-js/stable';
import '../node_modules/regenerator-runtime/runtime'
import './pages/index.css';

import Validation from './components/validate.js';

//UserInfo
import {jobInput, userInfoSelectors} from './components/constants.js';
import UserInfo from './components/userInfo.js';

import { renderCard } from './components/cards.js';
import { validConfig } from './components/validConfig.js';
import { closeModal, openModal, fillModalImg, openModalProfile, addCardFromForm, handleFormProfileSubmit, closeModalOverlay, avatarSubmit, renderButtonLoading } from './components/modal.js';
import { avatarInput, imgPopup, profileFormElement, profilePopup, photosGrid, imgModalButtonClose, profileModalCloseButton, profileModalOpenButton, placeFormElement, placePopup, placeModalOpenButton, placeModalCloseButton, profileName, avatar, profileDesc, avatarFormElement, avatarModalOpenButton, avatarModalCloseButton, avatarPopup, apiConfig, nameInput, JobInput, imgDescElement, imgElement,} from './components/constants.js'
import Section from './components/section'; //import { renderCard } from './components/cards.js';
import {Card} from './components/card.js';
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

user.getUserInfo();



// Пользователь

api.getUser().then((user) => {
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
          console.log(cardImg.getAttribute('alt'));
          const imgPopupObj = new PopupWithImage(cardImg.getAttribute('src'), cardImg.getAttribute('alt'), imgPopup);
          imgPopupObj.fillPopupImg(imgElement, imgDescElement);
          imgPopupObj.open();
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






// Слушатели
// Профиль

profileModalOpenButton.addEventListener('click', () => {

  
  
  const profilePopupEl = new PopupWithForm(profilePopup, {apiCallBack: (data) => {

    if (data.formName === 'profile-info') {
      
      api.patchUser(data.data[0].value, data.data[1].value).then(data => {
        user.setUserInfo(data.name, data.about, false);
    })
    }
  }});

  profilePopupEl.open();
  profilePopupEl.setEventListeners();


});

// Окно добавления аватара

avatarModalOpenButton.addEventListener('click', () => {
  const avatarPopupEl = new PopupWithForm(avatarPopup, {apiCallBack: (data) => {

    //console.log(data);
    if (data.formName === 'avatar-info') {
      
      
      
      api.patchAvatar(data.data[0].value).then(res => {
        api.getUser().then(res => {
          //console.log(res);
          user.setUserInfo(false, false, res.avatar);
        })
        
      }) 
    }
  }});
  avatarPopupEl.open();
  //avatarPopupEl.setEventListeners();
});




// Окно добавления карточки

placeModalOpenButton.addEventListener('click', () => {
  const placePopupEl = new PopupWithForm(placePopup, {apiCallBack: (data) => {
    if (data.formName === 'place-info') {
      api.postCard(data.data[0].value, data.data[1].value).then(data => {
        
        //Сюда вписать обращение к методу добавления карточки <----------------------------------------------------
        
      })
    }
  } });
  placePopupEl.open();
  //placePopupEl.setEventListeners();
});


//placeFormElement.addEventListener('submit', addCardFromForm);


// Открытие-закрытие модального окна картинки

imgModalButtonClose.addEventListener('click', () => { closeModal(imgPopup) });




//New OOP validation

const formList = Array.from(document.querySelectorAll(validConfig.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const validation = new Validation(validConfig, formElement);
  validation.enableValidation();
});





