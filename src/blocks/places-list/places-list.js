//Class for initial cards on loading page

import Card from '../place-card/place-card';

export default class CardList {
  constructor(containers, api, userId) {
    this.containers = containers;
    this.api = api;
    // this.load();
  }

  addCard(title, link, likes, cardId, ownerId, userId) {
    const {
      cardElement
    } = new Card(title, link, likes, cardId, ownerId, userId);
    this.cards.push(cardElement);
    this.containers.appendChild(cardElement);
  }

  // load() {
  //   this.api.getInitialCards()
  //     .then((resArray) => {
  //       this.cards = Array.from(resArray)
  //       this.cards.forEach(element => {
  //         this.addCard(element.name, element.link, element.likes.length, element._id, element.owner._id)
  //       })
  //     })
  // }

  load(cards, userId) {
    this.cards = Array.from(cards)
    this.cards.forEach(card => {
      this.addCard(card.name, card.link, card.likes, card._id, card.owner._id, userId)
    })
  }
}