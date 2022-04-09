import './pages/index.css';
import { enableValidation } from './components/validate.js';
import { renderCard } from './components/cards.js';
import { validConfig } from './components/validConfig.js';
import { closeModal, openModal, openModalProfile, addCardFromForm, handleFormProfileSubmit, closeModalOverlay, avatarSubmit } from './components/modal.js';
import { imgPopup, profileFormElement, profilePopup, photosGrid, imgModalButtonClose, profileModalCloseButton, profileModalOpenButton, placeFormElement, placePopup, placeModalOpenButton, placeModalCloseButton, profileName, avatar, profileDesc, avatarFormElement, avatarModalOpenButton, avatarModalCloseButton, avatarPopup} from './components/constants.js'
import { getUser, getCards, getResponse, catchError, delCardById } from './components/api.js';

// Пользователь
getUser().then(res => getResponse(res)).then((user) => {
  profileName.textContent = user.name;
  profileDesc.textContent = user.about;
  avatar.setAttribute("src", user.avatar);
  console.log(user._id + ' - user._id');
  const userId = user._id;
  return userId
}).then((userId)=>{
  console.log(userId+ ' - userId после назначения');
  // Вывод карточек
  getCards().then(res => getResponse(res)).then((data) => renderCard(data, userId, delCardById)).catch(err => catchError(err));
}).catch(err => catchError(err));

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
