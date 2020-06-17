//Class for create, like and delete card

import {
  api
} from '../api';

export default class Card {
  constructor(title, link, likes, cardId, ownerId, userId) {
    //this.cardElement = this.createCard(title, link, counter, cardId);
    this.title = title;
    this.link = link;
    this.likes = likes;
    this.cardId = cardId;
    this.ownerId = ownerId;
    this.userId = userId;
    this.cardElement = this.createCard();


    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like.bind(this));
    //this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.delete);
  }

  createCard(titleValue, linkValue, counterValue) {
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

    placeCard.querySelector(".place-card__name").textContent = this.title;
    // placeCard.querySelector(".place-card__image").style.backgroundImage = 'url(' + this.link + ')';
    placeCard.querySelector(".place-card__image").style.backgroundImage = 'url(' + this.link + '), url(./images/image_error.jpg)';

    //placeCard.querySelector(".place-card__like-counter").textContent = this.likes.length;
    this.likes ? placeCard.querySelector(".place-card__like-counter").textContent = this.likes.length :
      placeCard.querySelector(".place-card__like-counter").textContent = '0';

    //const liked = this.likes.filter(like => like._id === this.userId);
    if (this.likes) {
      this.likes.forEach(like => {
        if (like._id === this.userId) {
          placeCard.querySelector('.place-card__like-icon').classList.add('place-card__like-icon_liked');
        }
      });
    }

    //<button class="place-card__delete-icon"></button>
    if (this.ownerId === this.userId) {
      const deleteButton = document.createElement('button');
      deleteButton.classList.add('place-card__delete-icon');
      placeCard.querySelector(".place-card__image").appendChild(deleteButton);
      deleteButton.addEventListener('click', this.delete.bind(this));
    }


    return placeCard;

    // const placeCard = document.createElement("div");
    // placeCard.classList.add("place-card");

    // placeCard.innerHTML = `
    //    <div class="place-card__image">
    //      <button class="place-card__delete-icon"></button>
    //    </div>
    //    <div class="place-card__description">
    //      <h3 class="place-card__name"></h3>
    //      <div class="place-card__like">
    //       <button class="place-card__like-icon"></button>
    //       <span class="place-card__like-counter"></span>
    //      </div>
    //    </div>`;

    // placeCard.querySelector(".place-card__name").textContent = titleValue;
    // placeCard.querySelector(".place-card__image").style.backgroundImage = 'url(' + linkValue + ')';
    // placeCard.querySelector(".place-card__like-counter").textContent = counterValue;
    // return placeCard;
  }

  like(event) {
    
    if (event.target.classList.contains('place-card__like-icon_liked')) {
      event.target.classList.remove('place-card__like-icon_liked');
      api.deleteLike(this.cardId)
        .then((card) => {
          this.cardElement.querySelector('.place-card__like-counter').textContent = card.likes.length;
        })
    } else {
      event.target.classList.add('place-card__like-icon_liked');
      console.log(this.cardId);
      api.setLike(this.cardId)
        .then((card) => {
          console.log(card);
          card.likes.length > '0' ? this.cardElement.querySelector('.place-card__like-counter').textContent = card.likes.length : this.cardElement.querySelector('.place-card__like-counter').textContent = '1';
        })
    }

    // event.target.classList.toggle('place-card__like-icon_liked');
    // console.log(this.userId);
    // api.setLike(this.cardId)
    // .then((card) => {
    //   console.log(card.owner._id);
    //   this.cardElement.querySelector('.place-card__like-counter').textContent = card.likes.length;
    //   })
  }

  delete(event) {
    console.log(this.cardId);
    api.deleteCard(this.cardId);
    event.target.closest('.place-card').remove();
  }
}