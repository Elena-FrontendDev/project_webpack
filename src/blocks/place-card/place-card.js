//Class for create, like and delete card

import {
  api
} from '../api';

export default class Card {
  constructor() {

  }

  createCard(titleValue, linkValue, counterValue, cardId, ownerId, userId) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");

    placeCard.innerHTML = `
       <div class="place-card__image">
         
       </div>
       <div class="place-card__description">
         <h3 class="place-card__name"></h3>
         <div class="place-card__like">
          <button class="place-card__like-icon"></button>
          <span class="place-card__like-counter"></span>
         </div>
       </div>`;

    placeCard.querySelector(".place-card__name").textContent = titleValue

    placeCard.querySelector(".place-card__image").style.backgroundImage = 'url(' + linkValue + '), url(./images/image_error.jpg)';


    counterValue ? placeCard.querySelector(".place-card__like-counter").textContent = counterValue.length :
      placeCard.querySelector(".place-card__like-counter").textContent = '0';

    if (counterValue) {
      counterValue.forEach(like => {

        if (like._id === userId) {
          placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
        }
      });
    }


    if (ownerId === userId) {
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('place-card__delete-icon');
      placeCard.querySelector(".place-card__image").appendChild(deleteButton);

      this.delete(placeCard, cardId);
    }

    this.like(placeCard, cardId);

    return placeCard;
  }


  like(placeCard, cardId) {

    placeCard.querySelector('.place-card__like-icon').addEventListener('click', () => {
      const targetCard = event.target.closest('.place-card')
      if (event.target.classList.contains('place-card__like-icon_liked')) {
        event.target.classList.remove('place-card__like-icon_liked');

        api.deleteLike(cardId)
          .then((card) => {
            targetCard.querySelector('.place-card__like-counter').textContent = card.likes.length;
          })
      } else {
        event.target.classList.add('place-card__like-icon_liked');

        api.setLike(cardId)
          .then((card) => {
            card.likes.length > '0' ? targetCard.querySelector('.place-card__like-counter').textContent = card.likes.length : targetCard.querySelector('.place-card__like-counter').textContent = '1';
          })
      }
    })
  }


  delete(placeCard, cardId) {

    placeCard.querySelector('.place-card__delete-icon').addEventListener('click', () => {

      api.deleteCard(cardId);
      placeCard.remove();
    })
  }

}