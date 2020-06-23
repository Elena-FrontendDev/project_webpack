const container = document.querySelector('.root');
const addNewCardForm = document.forms.new;

// Class for popup

export default class Popup {
  constructor(popupContainer) {
    this.popupContainer = popupContainer;
  }

  open() {
    this.popupContainer.classList.add('popup_is-opened');
    this.popupContainer.querySelector('.popup__button').setAttribute('disabled', true);
  }

  close() {
    this.popupContainer.classList.remove('popup_is-opened');
    this.popupContainer.querySelector('.popup__button').classList.remove('popup__button_active');

    const errorMessages = this.popupContainer.querySelectorAll('.error-message');
    errorMessages.forEach(errors => {
      errors.textContent = '';
    });
  }
  
}