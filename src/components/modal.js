import {imgDescElement, imgElement, profileName, profileDesc, avatarInput, avatar, nameInput, jobInput, profilePopup, imgInput, placeInput, placePopup, photosGrid, avatarPopup} from './constants.js';
import { createCard } from './card.js';
import { validConfig } from './validConfig.js';
import { disableButton } from './validate.js';
import { getUser, getResponse, catchError, patchUser, postCard, patchAvatar } from './api.js';

// Функции открытия и закрытия модального окна
function openModal(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeModalEsc);
}
function openModalProfile(popup) {
  openModal(popup);
  //! api
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

// Добавление карточки из формы
function addCardFromForm(evt) {
  evt.preventDefault();
  renderButtonLoading(true, placePopup);
  const buttonElement = evt.target.querySelector('.form__button');
  //! api
  postCard(imgInput.value, placeInput.value).then(res => getResponse(res)).then((data) => {
    photosGrid.prepend(createCard(data.link, data.name, [], data._id));
  }).catch(err => catchError(err)).finally(() => {
    renderButtonLoading(false, placePopup);
  });
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

// Обновление профиля
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  renderButtonLoading(true, profilePopup);
  const nameValue = nameInput.value;
  const jobValue = jobInput.value;
  //! api
  patchUser(nameValue, jobValue).then(res => getResponse(res)).then((data) => {
    profileName.textContent = data.name;
    profileDesc.textContent = data.about;
  }).catch(err => catchError(err)).finally(() => {
    renderButtonLoading(false, profilePopup);
  });;

  closeModal(profilePopup);
}

// Обновление аватара
function avatarSubmit(evt) {
  evt.preventDefault();
  renderButtonLoading(true, avatarPopup);
  //const buttonElement = evt.target.querySelector('.form__button');
  //! api
  patchAvatar(avatarInput.value).then(res => getResponse(res)).then((data) => {
    avatar.setAttribute("src", avatarInput.value);
    console.log(data + " автар добавлен");
  }).catch(err => catchError(err)).finally(() => {
    renderButtonLoading(false, avatarPopup);
  });
  closeModal(avatarPopup);
  //disableButton(buttonElement, validConfig.inactiveButtonClass);
}

function renderButtonLoading(isLoading, popup) {
  const button = popup.querySelector('.form__button')
  if(isLoading) {
    button.textContent = "Сохранение...";
  } else {
    button.textContent = "Сохранить";
  }
}

export {fillModalImg, openModal, openModalProfile, closeModal, closeModalEsc, closeModalOverlay, handleFormProfileSubmit, addCardFromForm, avatarSubmit};
