import '../node_modules/core-js/stable';
import '../node_modules/regenerator-runtime/runtime'
import './pages/index.css';

import FormValidator from './components/FormValidator.js';
//UserInfo
import UserInfo from './components/UserInfo.js';
import { validConfig } from './components/validConfig.js';
import { imgPopup, profilePopup, photosGrid, profileModalOpenButton, placePopup, placeModalOpenButton, avatar, avatarModalOpenButton,avatarPopup, apiConfig, cardTemplate, userInfoSelectors, imgDescElement, imgElement} from './components/constants.js'
import Section from './components/Section';
import Api from './components/Api.js';
import PopupWithImage from './components/PopupImg.js';
import PopupWithForm from './components/PopupWithForm.js';
import { Card } from './components/Card.js';


const api = new Api(apiConfig);

const user = new UserInfo({
  data: userInfoSelectors,
  apiCallBack: () => {
    return api.getUser()
  }
}, avatar);

let userId = '';

const imgPopupObj = new PopupWithImage(imgPopup);
const cardSection = new Section();

// Функция создания карточки
function createCard(cardItem, userId, selector, imgPopupObj, api) {
  const card = new Card(cardItem, userId, selector);
  // Слушатели в виде колбэков передаются после создания карточки
  const cardElement = card.generate();
  const cardImg = card.cardImg;
  const cardId = card.getId();
  card.create({
    delCallback: () => {
      return api.delCardById(cardId)
    },
    likeCallback: () => {
      return api.toggleLikeCardById(cardId, card.isLiked)
    },
    imgCallback: () => {
      console.log(cardImg);
      imgPopupObj.open(imgElement, imgDescElement, cardImg.getAttribute('src'), cardImg.getAttribute('alt'));
    }
  });
  return cardElement;
}


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
    cardSection.create({
      cardData: data,
      renderer: (cardItem) => {
        const cardEl = createCard(cardItem, userId, cardTemplate, imgPopupObj, api);
        //const cardElement = card.generate();
        cardSection.setItemAll(cardEl);
      },
    }, photosGrid);
    cardSection.renderItems();
  }
  ).catch(err => api.catchError(err));

}).catch(err => api.catchError(err));



// Профиль попап

const profilePopupEl = new PopupWithForm(profilePopup, {
  apiCallBack: (data) => {
      //renderButtonLoading(true, profilePopup);
      profilePopupEl.renderLoading(true);

      api.patchUser(data.name, data.desc).then(data => {
        user.setUserInfo(data.name, data.about, false);
        profilePopupEl.close();
      })
      .catch(err => api.catchError(err))
      .finally(data => {
          
          profilePopupEl.renderLoading(false);
          
      })
}
});

// Аватар попап

const avatarPopupEl = new PopupWithForm(avatarPopup, {apiCallBack: (data) => {
  avatarPopupEl.renderLoading(true);
  //renderButtonLoading(true, avatarPopup);

    api.patchAvatar(data.avatar).then(res => {  
      user.setUserInfo(false, false, res.avatar);
      avatarPopupEl.close();

    })
    .catch(err => api.catchError(err))
    .finally(res => {
      avatarPopupEl.renderLoading(false);
      
    })


}});


// Попап карточки

const placePopupEl = new PopupWithForm(placePopup, {apiCallBack: (data) => {
  placePopupEl.renderLoading(true);
  //renderButtonLoading(true, placePopup);

    api.postCard(data.imgPlace, data.place).then(data => {

      cardSection.create({
        cardData: data,
        renderer: () => {
          const cardEl = createCard(data, userId, cardTemplate, imgPopupObj, api);

          cardSection.setItem(cardEl);
        },
      }, photosGrid);
      cardSection.renderItems();
      placePopupEl.close();
    })
    .catch(err => api.catchError(err))
    .finally(res => {
      placePopupEl.renderLoading(false);
     
    })


}});

// Открытие профайл попапа

profileModalOpenButton.addEventListener('click', () => {

  
  profilePopupEl.setInputValues(user.getValues());
  profilePopupEl.open();


});

// Открытие аватар попапа

avatarModalOpenButton.addEventListener('click', () => {

  
  avatarPopupEl.open();
});

// Открытие попапа карточки

placeModalOpenButton.addEventListener('click', () => {

  

  placePopupEl.open();
});



//Валидация


const formList = Array.from(document.querySelectorAll(validConfig.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const validator = new FormValidator(validConfig, formElement);
  validator.enableValidation();
});

