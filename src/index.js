import './pages/index.css';
import { enableValidation } from './components/validate.js';
import { Section } from './components/section.js'; //import { renderCard } from './components/cards.js';
import { validConfig } from './components/validConfig.js';
import { closeModal, openModal, openModalProfile, addCardFromForm, handleFormProfileSubmit, closeModalOverlay, avatarSubmit } from './components/modal.js';
import { imgPopup, profileFormElement, profilePopup, photosGrid, imgModalButtonClose, profileModalCloseButton, profileModalOpenButton, placeFormElement, placePopup, placeModalOpenButton, placeModalCloseButton, profileName, avatar, profileDesc, avatarFormElement, avatarModalOpenButton, avatarModalCloseButton, avatarPopup, apiConfig} from './components/constants.js'
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
      data: data,
      renderer: (item) => {
        //const message = new DefaultMessage(item, '.message-template_type_default');
        createCard(item['link'], item['name'], item['likes'], item['_id'], item['owner']._id, userId, delCardById);
        //todo разобраться с generate
        const messageElement = message.generate();
        cardsList.setItem(messageElement);
      },
    });

  }  //renderCard(data, userId, delCardById)
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
