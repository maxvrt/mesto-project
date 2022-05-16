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

const imgPopupObj = new PopupWithImage(imgPopup, imgElement, imgDescElement);

const cardSection = new Section({
  renderer: (cardItem) => {
    const cardEl = createCard(cardItem, userId, cardTemplate, imgPopupObj);
    cardSection.setItem(cardEl);
  },
}, photosGrid);

// Функция создания карточки
function createCard(cardItem, userId, selector, imgPopupObj) {
  // колбэки из метода create перенес в конструктор
  const card = new Card(cardItem, userId, selector,
    {
      delCallback: () => {
        deleteCard(card);
      },
      likeCallback: () => {
        likeCard(card, cardItem)
      },
      imgCallback: () => {
        imgPopupObj.open(card.cardImg.getAttribute('src'), card.cardImg.getAttribute('alt'));
      }
    }
    );
  // Слушатели в виде колбэков передаются после создания карточки
  const cardElement = card.generate();
  return cardElement;
}

function deleteCard(card) {
  api.delCardById(card._cardId).then((data) => {
    card.delCard();
  }).catch(err => {console.log('Ошибка. Запрос не выполнен (класс): ', err)});
}

function likeCard(card, data) {
  console.log('проверка лайка ' + card.isLiked);
  if (card.isLiked) {
    api.delLikeById(data._id).then((data) => {
      card.toggleLike(data);
    }).catch(err => {console.log('Ошибка. Запрос не выполнен (класс): ', err)});
  } else {
    api.likeCardById(data._id).then((data) => {
      card.toggleLike(data);
    }).catch(err => {console.log('Ошибка. Запрос не выполнен (класс): ', err)});
  }
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
    cardSection.renderItems(data);
    //makeCards(data);
  }
  ).catch(err => api.catchError(err));

}).catch(err => api.catchError(err));



// Профиль попап
profileModalOpenButton.addEventListener('click', () => {

  const profilePopupEl = new PopupWithForm(profilePopup, {
    apiCallBack: (data) => {
        //renderButtonLoading(true, profilePopup);
        profilePopupEl.renderLoading(true);

        api.patchUser(data.name, data.desc).then(data => {
          user.setUserInfo(data.name, data.about, false);
        })
        .catch(err => api.catchError(err))
        .finally(data => {
            //renderButtonLoading(false, profilePopup);
            profilePopupEl.renderLoading(false);
            profilePopupEl.close();
        })
  }
  });
  profilePopupEl.setInputValues(user.getValues());
  profilePopupEl.open();


});

// Окно добавления аватара
avatarModalOpenButton.addEventListener('click', () => {
  const avatarPopupEl = new PopupWithForm(avatarPopup, {apiCallBack: (data) => {
    avatarPopupEl.renderLoading(true);
    //renderButtonLoading(true, avatarPopup);
      api.patchAvatar(data.avatar).then(res => {
        console.log(res)
        api.getUser().then(res => {
          user.setUserInfo(false, false, res.avatar);
        })

      })
      .catch(err => api.catchError(err))
      .finally(res => {
        avatarPopupEl.renderLoading(false);
        //renderButtonLoading(false, avatarPopup);
        avatarPopupEl.close();
      })


  }});
  avatarPopupEl.open();
});

// Окно добавления карточки
placeModalOpenButton.addEventListener('click', () => {
  const placePopupEl = new PopupWithForm(placePopup, {apiCallBack: (data) => {
    placePopupEl.renderLoading(true);
    //renderButtonLoading(true, placePopup);

      api.postCard(data.imgPlace, data.place).then(data => {
        cardSection.setItemOne(data);
      })
      .catch(err => api.catchError(err))
      .finally(res => {
        placePopupEl.renderLoading(false);
        //renderButtonLoading(false, placePopup);
        placePopupEl.close();
      })


  }});

  placePopupEl.open();
});

//New OOP validation
const formList = Array.from(document.querySelectorAll(validConfig.formSelector));
formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  const validator = new FormValidator(validConfig, formElement);
  validator.enableValidation();
});

