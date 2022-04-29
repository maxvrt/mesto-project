import './pages/index.css';
import { enableValidation } from './components/validate.js';
import { validConfig } from './components/validConfig.js';
import { closeModal, openModal, fillModalImg, openModalProfile, addCardFromForm, handleFormProfileSubmit, closeModalOverlay, avatarSubmit } from './components/modal.js';
import * as constants from './components/constants.js'
import Section from './components/section'; //import { renderCard } from './components/cards.js';
import { Card } from './components/card.js';
import { Api } from './components/api.js';

const api = new Api(constants.apiConfig);
// Пользователь
api.getUser().then((user) => {
  constants.profileName.textContent = user.name;
  constants.profileDesc.textContent = user.about;
  constants.avatar.setAttribute("src", user.avatar);
  console.log(user._id + ' - user._id');
  const userId = user._id;
  return userId
}).then((userId)=>{
  console.log(userId+ ' - userId после назначения');

  // Вывод карточек
  api.getCards().then((data) => {
    const cardsList = new Section({
      cardListData: data,
      renderer: (cardItem) => {
        // Тут просто объект с данными
        const card = new Card(cardItem, userId, constants.cardTemplate);
        // Сам элемент верстки
        const cardElement = card.generate();
        // Есть ли лайк пользователя
        const isLike = card.checkUserLike();
        if(isLike) cardElement.querySelector(constants.cardLike).classList.add(constants.cardLikeActiveClass);
        // Слушатели удаления, лайка и открытия картинки у карточки
        const cardId = card.getId();
        const cardImg = card.getImg();
        const heartButton = card.getLikeButton(cardElement);
        const delButton = card.getDelButton(cardElement);
        const likeElement = card.getLikeElement(heartButton);// heartButton.parentNode.querySelector(constants.likeElement);
        delButton.addEventListener('click',  () => {
          api.delCardById(cardId).then(() => {
            card.delCard(delButton);
          }).catch(err => catchError(err));
        });
        heartButton.addEventListener('click',  () => {
          heartButton.classList.toggle(constants.cardLikeActiveClass);
          if (heartButton.classList.contains(constants.cardLikeActiveClass)){
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
          openModal(constants.imgPopup);
        });
        //console.log(cardElement);
        //! Вывод карточек
        cardsList.setItem(cardElement);
      },
    }, constants.photosGrid);
    cardsList.renderItems();
  }
  ).catch(err => api.catchError(err));

}).catch(err => api.catchError(err));

// Инициализация валидации
enableValidation(validConfig);

// Слушатели
// Профиль
constants.profileModalCloseButton.addEventListener('click', () => {closeModal(constants.profilePopup)});
constants.profileModalOpenButton.addEventListener('click', () => {openModalProfile(constants.profilePopup)});
constants.profileFormElement.addEventListener('submit', handleFormProfileSubmit);
// Окно добавления аватара
constants.avatarModalCloseButton.addEventListener('click', () => {closeModal(constants.avatarPopup)});
constants.avatarModalOpenButton.addEventListener('click', () => {openModal(constants.avatarPopup)});
constants.avatarFormElement.addEventListener('submit', avatarSubmit);
// Окно добавления карточки
constants.placeModalCloseButton.addEventListener('click', () => {closeModal(constants.placePopup)});
constants.placeModalOpenButton.addEventListener('click', () => {openModal(constants.placePopup)});
constants.placeFormElement.addEventListener('submit', addCardFromForm);
// Открытие-закрытие модального окна картинки
constants.imgModalButtonClose.addEventListener('click', () => { closeModal(constants.imgPopup) });
// Закрытие модальных окон
constants.profilePopup.addEventListener('click', evt => {closeModalOverlay(evt, constants.profilePopup)});
constants.placePopup.addEventListener('click', evt => {closeModalOverlay(evt, constants.placePopup)});
constants.imgPopup.addEventListener('click', evt => {closeModalOverlay(evt, constants.imgPopup)});
