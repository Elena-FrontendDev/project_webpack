//Class for initial cards on loading page

import Card from '../place-card/place-card';

export default class CardList {
    constructor(containers, api) {
      this.containers = containers;
      this.api = api;
      this.load();
    }
  
     addCard(title, link) {
      const { cardElement } = new Card(title, link);
  
      this.cards.push(cardElement);
      this.containers.appendChild(cardElement);
    }
  
    load() {
      this.api.getInitialCards()
        .then((resArray) => {
          this.cards = Array.from(resArray)
           this.cards.forEach(element => 
            this.addCard(element.name, element.link))
    })
    }
  }