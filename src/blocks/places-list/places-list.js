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
    // this.cards.push(cardElement);
    this.containers.appendChild(cardElement);
  }

  load(cards, userId) {
    cards.forEach(card => {
      // let img = document.createElement('img');
      // img.src = `${card.link}`;

      // img.onload = () => {
      //   this.addCard(card.name, card.link, card.likes, card._id, card.owner._id, userId)
      // }
      // img.onerror = () => {
      //   this.addCard(card.name, './images/image_error.jpg', card.likes, card._id, card.owner._id, userId)
      // }
      this.addCard(card.name, card.link, card.likes, card._id, card.owner._id, userId)
    })

    // load() {
    //   this.api.getInitialCards()
    //     .then((resArray) => {
    //       this.cards = Array.from(resArray)
    //       this.cards.forEach(element => {
    //         this.addCard(element.name, element.link, element.likes.length, element._id, element.owner._id)
    //       })
    //     })
    // }

    //   load(filteredCards, userId) {
    //     this.cards = Array(filteredCards);
    // console.log(this.cards.length);
    //     filteredCards.forEach(card => {
    //       console.log('1');
    //       this.addCard(card.name, card.link, card.likes, card._id, card.owner._id, userId)
    //     })

    // this.cards = Array.from(cards);
    // cards.forEach(card => {
    //   let img = document.createElement('img');
    //   img.src = `${card.link}`;

    //   img.onload = () => {
    //     this.addCard(card.name, card.link, card.likes, card._id, card.owner._id, userId)
    //   }
    // img.onerror = () => {
    //   console.log("Ошибка во время загрузки изображения")
    // }
    // this.addCard(card.name, card.link, card.likes, card._id, card.owner._id, userId)
    // })
  }
}