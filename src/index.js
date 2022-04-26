import './pages/index.css';
import { enableValidation } from './components/validate.js';
import { validConfig } from './components/validConfig.js';
import { closeModal, openModal, fillModalImg, openModalProfile, addCardFromForm, handleFormProfileSubmit, closeModalOverlay, avatarSubmit } from './components/modal.js';
import { imgPopup, profileFormElement, profilePopup, photosGrid, imgModalButtonClose, profileModalCloseButton, profileModalOpenButton, placeFormElement, placePopup, placeModalOpenButton, placeModalCloseButton, profileName, avatar, profileDesc, avatarFormElement, avatarModalOpenButton, avatarModalCloseButton, avatarPopup, apiConfig} from './components/constants.js'
import Section from './components/section'; //import { renderCard } from './components/cards.js';
import { Card } from './components/card.js';
import { Api } from './components/api.js';

const api = new Api(apiConfig);
// Пользователь
api.getUser().then((user) => {
  profileName.textContent = user.name;
  profileDesc.textContent = user.about;
  avatar.setAttribute("src", user.avatar);
  //console.log(user._id + ' - user._id');
  const userId = user._id;
  return userId
}).then((userId)=>{
  //console.log(userId+ ' - userId после назначения');
  // Вывод карточек
  api.getCards().then((data) => {
    const cardsList = new Section({
      cardListData: data,
      renderer: (item) => {
        const card = new Card(item, userId, '#card-template');
        const cardElement = card.generate();
        // Есть ли лайк пользователя
        const isLike = card.checkUserLike();
        if(isLike) card.querySelector('.photos-grid__heart').classList.add('photos-grid__heart_active');
        console.log();
        // Слушатели удаления, лайка и открытия картинки у карточки
        const cardId = item._id;
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
        cardsList.setItem(cardElement);
      },
    }, photosGrid);
    cardsList.renderItems();
  }
  ).catch(err => api.catchError(err));

}).catch(err => api.catchError(err));

// Инициализация валидации
enableValidation(validConfig);

// Слушатели
// Профиль
profileModalCloseButton.addEventListener('click', () => {closeModal(profilePopup)});
profileModalOpenButton.addEventListener('click', () => {openModalProfile(profilePopup)});
profileFormElement.addEventListener('submit', handleFormProfileSubmit);
// Окно добавления аватара
avatarModalCloseButton.addEventListener('click', () => {closeModal(avatarPopup)});
avatarModalOpenButton.addEventListener('click', () => {openModal(avatarPopup)});
avatarFormElement.addEventListener('submit', avatarSubmit);
// Окно добавления карточки
placeModalCloseButton.addEventListener('click', () => {closeModal(placePopup)});
placeModalOpenButton.addEventListener('click', () => {openModal(placePopup)});
placeFormElement.addEventListener('submit', addCardFromForm);
// Открытие-закрытие модального окна картинки
imgModalButtonClose.addEventListener('click', () => { closeModal(imgPopup) });
// Закрытие модальных окон
profilePopup.addEventListener('click', evt => {closeModalOverlay(evt, profilePopup)});
placePopup.addEventListener('click', evt => {closeModalOverlay(evt, placePopup)});
imgPopup.addEventListener('click', evt => {closeModalOverlay(evt, imgPopup)});
