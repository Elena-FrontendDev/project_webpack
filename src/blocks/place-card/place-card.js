//Class for create, like and delete card

export default class Card {
  constructor(title, link, counter,) {
    this.cardElement = this.createCard(title, link, counter);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.delete);
  }

  createCard(titleValue, linkValue, counterValue) {
    const placeCard = document.createElement("div");
    placeCard.classList.add("place-card");

    placeCard.innerHTML = `
       <div class="place-card__image">
         <button class="place-card__delete-icon"></button>
       </div>
       <div class="place-card__description">
         <h3 class="place-card__name"></h3>
         <div class="place-card__like">
          <button class="place-card__like-icon"></button>
          <span class="place-card__like-counter"></span>
         </div>
       </div>`;

    placeCard.querySelector(".place-card__name").textContent = titleValue;
    placeCard.querySelector(".place-card__image").style.backgroundImage = 'url(' + linkValue + ')';
    placeCard.querySelector(".place-card__like-counter").textContent = counterValue;

    return placeCard;
  }

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }

  delete(event) {
    event.target.closest('.place-card').remove();
  }
}