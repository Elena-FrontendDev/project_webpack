import {
    api
} from './blocks/api';
import ProfileInfo from './blocks/profile/profile';
import NewEditProfileInfo from './blocks/profile/editprofile';
import CardList from './blocks/places-list/places-list';
import Card from './blocks/place-card/place-card';
import Popup from './blocks/popup/popup';
import {
    getInfoForForm
} from './blocks/profile/editprofile';
import {
    openImageFullsize,
    closeImageFullsize
} from './images/images';
import './blocks/popup/__form/form_validate';
import './images/image_error.jpg'


const container = document.querySelector('.root');
const showNewCardPopupButton = container.querySelector('.user-info__button');
const newCardCloseButton = container.querySelector('.popup__close');
const cardList = container.querySelector('.places-list');
const addNewCardForm = document.forms.new;
const preloader = document.querySelector('.preloader');

const showEditProfileButton = container.querySelector('.edit-profile__button');
const closeEditProfileButton = container.querySelector('.popup__edit-profile__close');
const editCardForm = document.forms.edit;
const closeImageButton = document.querySelector('.popup__image_close');


const avatar = document.querySelector('.user-info__photo');
const cardname = document.querySelector('#cardname');
const cardlink = document.querySelector('#cardlink');
const cardSaveButton = addNewCardForm.querySelector('.popup__button');


const profileInfo = new ProfileInfo('.user-info__name', '.user-info__job', '.user-info__photo', api);
const newEditProfileInfo = new NewEditProfileInfo('.popup__input_type_edit-name', '.popup__input_type_about')
const popup = new Popup(container.querySelector('.popup'));
const popupEdit = new Popup(container.querySelector('.popup__edit-profile'));
const popupAvatar = new Popup(container.querySelector('.popup__avatar'));
const newCard = new Card();
const cardListContainer = new CardList(document.querySelector('.places-list'), api, newCard, userId);


const closeAvatarEdit = container.querySelector('.popup__avatar__close');
const avatarForm = document.forms.avatar;
const avatarLink = document.querySelector('#avatarlink');
const avatarSaveButton = avatarForm.querySelector('.popup__button');

let userId = null;



//Get information about Profile from and render initial cards from server

window.onload = () => {
    api.getProfileInfo()
        .then((result) => {
            profileInfo.info(result);
            userId = result._id;
        })

        preloader.classList.add('preloader-active');
    api.getInitialCards()

        .then((cards) => {
            cardListContainer.load(cards, userId)
        })

        .finally(() => {
            preloader.classList.remove('preloader-active');
        })
}


//Validation for popup for create new card

addNewCardForm.addEventListener('input', function () {
    if (cardname.checkValidity() && cardlink.checkValidity()) {
        cardSaveButton.classList.add('popup__button_active');
    } else {
        cardSaveButton.classList.remove('popup__button_active');
    }
    cardSaveButton.disabled = !addNewCardForm.checkValidity();
});


//Validation for card name input 

cardname.addEventListener('input', function () {
    let error = '';

    if (!cardname.checkValidity()) {
        if (cardname.validity.tooShort || cardname.validity.tooLong) {
            error = 'Должно быть от 2 до 30 символов';
        }
        if (cardname.validity.valueMissing) {
            error = 'Это обязательное поле';
        }
    }
    cardname.nextElementSibling.textContent = error;

});


//Validation for card link input 

cardlink.addEventListener('input', function () {
    let error = '';

    if (!cardlink.checkValidity()) {
        if (cardlink.validity.valueMissing) {
            error = 'Это обязательное поле';
        }
        if (cardlink.validity.typeMismatch) {
            error = 'Здесь должна быть ссылка';
        }
    }
    cardlink.nextElementSibling.textContent = error;

});


//Open popup for edit avatar

avatar.addEventListener('click', () => {
    popupAvatar.open();
});


//Close popup for edit avatar

closeAvatarEdit.addEventListener('click', () => {
    popupAvatar.close();
    avatarForm.reset();
});


//Validation for avatar's link 

avatarLink.addEventListener('input', function () {
    let error = '';

    if (!avatarLink.checkValidity()) {
        if (avatarLink.validity.valueMissing) {
            error = 'Это обязательное поле';
        }
        if (avatarLink.validity.typeMismatch) {
            error = 'Здесь должна быть ссылка';
        }
    }
    avatarLink.nextElementSibling.textContent = error;

});


//Lister for input for avatar field

avatarForm.addEventListener('input', function () {
    if (avatarLink.checkValidity()) {
        avatarSaveButton.classList.add('popup__button_active');
    } else {
        avatarSaveButton.classList.remove('popup__button_active');
    }
    avatarSaveButton.disabled = !avatarForm.checkValidity();
});


//Update avatar image on the server after submit form

avatarForm.addEventListener('submit', () => {
    event.preventDefault();
    avatar.style.backgroundImage = 'url(' + avatarForm.elements.link.value + ')';
    api.editAvatar(avatarForm.elements.link.value);
    popupAvatar.close();
})


//Open popup for edit user information and show information for fields from the server

showEditProfileButton.addEventListener('click', function () {
    getInfoForForm();
    popupEdit.open();
});


//Close popup for edit user information on click close button

closeEditProfileButton.addEventListener('click', function () {
    popupEdit.close();
});


//Update user information on the sever after submit form and close popup

editCardForm.addEventListener('submit', function () {
    newEditProfileInfo.edit(event);
    popupEdit.close();
});



//Open popup for create new card

showNewCardPopupButton.addEventListener('click', function () {
    popup.open();
});


//Close popup for create new card

newCardCloseButton.addEventListener('click', function () {
    popup.close();
    addNewCardForm.reset();
});


//Send information about new card after submit form for create card

addNewCardForm.addEventListener('submit', function (event) {
    event.preventDefault();

    api.saveNewCard(addNewCardForm.elements.name.value, addNewCardForm.elements.link.value)
        .then((card) => {
            cardListContainer.addCard(card.name, card.link, card.likes, card._id, card.owner._id, userId);
        })

    popup.close();
    addNewCardForm.reset();
});



//Open full size image on click for card's image

cardList.addEventListener('click', openImageFullsize);


//Close full size image on click close button

closeImageButton.addEventListener('click', closeImageFullsize);