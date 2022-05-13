import { imgDescElement, imgElement,} from './constants'
import { Card } from './Card.js';

export function createCard(cardItem, userId, selector, imgPopupObj, api) {
  const card = new Card(cardItem, userId, selector);
  // Слушатели в виде колбэков передаются после создания карточки
  const cardElement = card.generate();
  const cardImg = card.cardImg;
  const cardId = card.getId();
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
