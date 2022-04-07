import './pages/index.css';
import { enableValidation } from './components/validate.js';
import { initialCards } from './components/cards.js';
import { createCard } from './components/card.js';
import { validConfig } from './components/validConfig.js';
import { closeModal, openModal, openModalProfile, addCardFromForm, handleFormProfileSubmit, closeModalOverlay } from './components/modal.js';
import { imgPopup, profileFormElement, profilePopup, photosGrid, imgModalButtonClose, profileModalCloseButton, profileModalOpenButton, placeFormElement, placePopup, placeModalOpenButton, placeModalCloseButton, avatar, profileName, profileDesc} from './components/constants.js'
import { getUser } from './components/api.js';

// Инициализация карточек
initialCards.forEach((item) => {
  photosGrid.append(createCard(item['link'],item['name']));
});

const user = getUser();
avatar.src = user.avatar;
console.log(getUser());
profileName.textContent = user.name;
profileDesc.textContent = user.about;

// Инициализация валидации
enableValidation(validConfig);


// Слушатели
// Профиль
profileModalCloseButton.addEventListener('click', () => {closeModal(profilePopup)});
profileModalOpenButton.addEventListener('click', () => {openModalProfile(profilePopup)});
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
