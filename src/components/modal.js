import {imgDescElement, imgElement, profileName, profileDesc, avatar, nameInput, jobInput, profilePopup, imgInput, placeInput, placePopup, photosGrid} from './constants.js';
import { createCard } from './card.js';
import { validConfig } from './validConfig.js';
import { disableButton } from './validate.js';
import { getUser, getResponse, catchError, patchUser, postCard } from './api.js';

// Функции открытия и закрытия модального окна
function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalEsc);
}
function openModalProfile(popup) {
  openModal(popup);
  getUser().then(res => getResponse(res)).then((user) => {
    nameInput.value = user.name;
    jobInput.value = user.about;
  }).catch(err => catchError(err));
}

function closeModal(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeModalEsc);
  console.log('удалили обработчик Esc');
}
function closeModalOverlay(evt, popup) {
  if (evt.target.classList.contains('popup_opened') && !evt.target.classList.contains('popup__popup-box')){
    closeModal(popup);
  }
}

function closeModalEsc(evt) {
  if (evt.key === 'Escape'){
    const popup = document.querySelector('.popup_opened');
    if (popup){
      closeModal(popup);
    }
  }
}

// Добавление карточки
function addCardFromForm(evt) {
  evt.preventDefault();
  const buttonElement = evt.target.querySelector('.form__button');
  //! api
  postCard(imgInput.value, placeInput.value).then(res => getResponse(res)).then((data) => {
    photosGrid.prepend(createCard(data.link, data.name));
  }).catch(err => catchError(err));
  closeModal(placePopup);
  disableButton(buttonElement, validConfig.inactiveButtonClass);
  imgInput.value = '';
  placeInput.value = '';
}

// Функция заполнения модального окна картинки
function fillModalImg(imgValue, altValue) {
  imgElement.setAttribute('src', imgValue);
  imgElement.setAttribute('alt', altValue);
  imgDescElement.textContent = altValue;
}

function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  //! api
  patchUser(nameValue, jobValue).then(res => getResponse(res)).then((data) => {
    profileName.textContent = data.name;
    profileDesc.textContent = data.about;
  }).catch(err => catchError(err));

  closeModal(profilePopup);
}

export {fillModalImg, openModal, openModalProfile, closeModal, closeModalEsc, closeModalOverlay, handleFormProfileSubmit, addCardFromForm};
