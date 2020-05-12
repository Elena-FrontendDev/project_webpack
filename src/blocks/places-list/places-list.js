//Class for initial cards on loading page

import Card from '../place-card/place-card';

export default class CardList {
  constructor(containers, api) {
    this.containers = containers;
    this.api = api;
    this.load();
  }

  addCard(title, link, counter) {
    const {cardElement} = new Card(title, link, counter);
    this.cards.push(cardElement);
    this.containers.appendChild(cardElement);
  }

  load() {
    this.api.getInitialCards()
      .then((resArray) => {
        this.cards = Array.from(resArray)
        this.cards.forEach(element =>
          {
            // console.log(element.likes.length);
          this.addCard(element.name, element.link, element.likes.length)})
      })
  }
}