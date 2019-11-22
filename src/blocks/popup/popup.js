const container = document.querySelector('.root');
const addNewCardForm = document.forms.new;
const addNewCardButton = container.querySelector('.popup__button');
const cardSaveButton = addNewCardForm.querySelector('.popup__button');

// Class for popup

export default class Popup {
    constructor(popupContainer) {
      this.popupContainer = popupContainer;
    }
  
    open() {
      this.popupContainer.classList.add('popup_is-opened');
      addNewCardButton.setAttribute('disabled', true);
    }
    close() {
      this.popupContainer.classList.remove('popup_is-opened');
      cardSaveButton.classList.remove('popup__button_active');
    }
  }