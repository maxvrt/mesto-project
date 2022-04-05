import {imgDescElement, imgElement, profileName, profileDesc, nameInput, jobInput, profilePopup, imgInput, placeInput, placePopup, photosGrid} from './constants.js';
import { createCard } from './card.js';
import { validConfig } from './validConfig.js';

// Функции открытия и закрытия модального окна
function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalEsc);
  if (popup.classList.contains('popup_profile')){
    nameInput.value = profileName.textContent;
    jobInput.value = profileDesc.textContent;
  }
}
function closeModal(popup) {
  popup.classList.remove('popup_opened');
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
      document.removeEventListener('keydown', closeModalEsc);
      console.log('удалили обработчик');
    }
  }
}

// function closeModalEsc(evt) {
//   const popup = document.querySelector('.popup_opened');
//   if (evt.key === 'Escape' && popup){
//     document.removeEventListener('keydown', evt => {closeModalEsc(evt)});
//     closeModal(popup);
//   }
// }

function disableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.classList.remove('link');
  buttonElement.setAttribute('disabled', '');
}
function enableButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.classList.add('link');
  buttonElement.removeAttribute('disabled');
}

// Добавление карточки
function addCardFromForm(evt) {
  evt.preventDefault();
  const buttonElement = evt.target.querySelector('.form__button');
  photosGrid.prepend(createCard(imgInput.value, placeInput.value));
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
  profileName.textContent = nameValue;
  profileDesc.textContent = jobValue;
  closeModal(profilePopup);
}

export {fillModalImg, openModal, closeModal, closeModalEsc, closeModalOverlay, handleFormProfileSubmit, addCardFromForm, disableButton, enableButton};
