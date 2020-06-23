//Class for initial cards on loading page

export default class CardList {
  constructor(containers, api, newCard, userId) {
    this.containers = containers;
    this.newCard = newCard;
    this.api = api;
  }

  addCard(title, link, likes, cardId, ownerId, userId) {

    const cardElement = this.newCard.createCard(title, link, likes, cardId, ownerId, userId);
    this.containers.appendChild(cardElement);

  }

  load(cards, userId) {
    cards.forEach(card => {

      this.addCard(card.name, card.link, card.likes, card._id, card.owner._id, userId)
    })
  }

}