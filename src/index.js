import './pages/index.css';
import { enableValidation } from './components/validate.js';
import { renderCard } from './components/cards.js';
import { validConfig } from './components/validConfig.js';
import { closeModal, openModal, openModalProfile, addCardFromForm, handleFormProfileSubmit, closeModalOverlay } from './components/modal.js';
import { imgPopup, profileFormElement, profilePopup, photosGrid, imgModalButtonClose, profileModalCloseButton, profileModalOpenButton, placeFormElement, placePopup, placeModalOpenButton, placeModalCloseButton, profileName, avatar, profileDesc} from './components/constants.js'
import { getUser, getCards, getResponse, catchError } from './components/api.js';

export let userId = '0';

getUser().then(res => getResponse(res)).then((user) => {
  profileName.textContent = user.name;
  profileDesc.textContent = user.about;
  avatar.setAttribute("src", user.avatar);
  userId = user._id;
}).catch(err => catchError(err));

// todo открыть карточки
getCards().then(res => getResponse(res)).then((data) => renderCard(data, userId)).catch(err => catchError(err));

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
