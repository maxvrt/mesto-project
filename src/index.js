import './pages/index.css';
import { enableValidation } from './scripts/validate.js';
import { initialCards } from './scripts/cards.js';
import { createCard } from './scripts/card.js';
import { validConfig } from './scripts/validConfig.js';
import { closeModal, openModal, addCardFromForm, handleFormProfileSubmit, closeModalOverlay, closeModalEsc } from './scripts/modal.js';
import { imgPopup, profileFormElement, profilePopup, photosGrid, imgModalButtonClose, profileModalCloseButton, profileModalOpenButton, placeFormElement, placePopup, placeModalOpenButton, placeModalCloseButton} from './scripts/constants.js'

// Инициализация карточек
initialCards.forEach((item) => {
  photosGrid.append(createCard(item['link'],item['name']));
});

// Инициализация валидации
enableValidation(validConfig);

// Слушатели
// Профиль
profileModalCloseButton.addEventListener('click', () => {closeModal(profilePopup)});
profileModalOpenButton.addEventListener('click', () => {openModal(profilePopup)});
profileFormElement.addEventListener('submit', handleFormProfileSubmit);
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
document.addEventListener('keydown', evt => {
  if (document.querySelector('.popup_opened')) closeModalEsc(evt);
});
