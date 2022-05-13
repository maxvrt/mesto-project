import { imgDescElement, imgElement,} from './constants'
import { Card } from './card.js';

export function createCard(cardItem, userId, selector, imgPopupObj) {
  const card = new Card(cardItem, userId, selector);
  const cardImg = card.imgCard;
  const cardId = card.getId();
  // Слушатели в виде колбэков передаются после создания карточки
  const cardElement = card.generate();
  card.create({
    delCallback: () => {
      return api.delCardById(cardId)
    },
    likeCallback: () => {
      return api.toggleLikeCardById(cardId, card.isLiked)
    },
    imgCallback: () => {
      console.log(cardImg);
      imgPopupObj.open(imgElement, imgDescElement, cardImg.getAttribute('src'), cardImg.getAttribute('alt'));
    }
  });
  return cardElement;
}
