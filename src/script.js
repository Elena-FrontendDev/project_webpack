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


const container = document.querySelector('.root');
const showNewCardPopupButton = container.querySelector('.user-info__button');
const newCardCloseButton = container.querySelector('.popup__close');
const cardList = container.querySelector('.places-list');
const addNewCardForm = document.forms.new;

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
const cardListContainer = new CardList(document.querySelector('.places-list'), api, userId);
const popup = new Popup(container.querySelector('.popup'));
const popupEdit = new Popup(container.querySelector('.popup__edit-profile'));
const popupAvatar = new Popup(container.querySelector('.popup__avatar'));

//
const closeAvatarEdit = container.querySelector('.popup__avatar__close');
const avatarForm = document.forms.avatar;
const avatarLink = document.querySelector('#avatarlink');
const avatarSaveButton = avatarForm.querySelector('.popup__button');


let userId = null;
api.getProfileInfo()
    .then((result) => {
        profileInfo.info(result);
        userId = result._id;
    })

const renderCards = () => {
    api.getInitialCards()
    .then((cards) => {
        cardListContainer.load(cards, userId)
    })
}
renderCards();


addNewCardForm.addEventListener('input', function () {
    if (cardname.checkValidity() && cardlink.checkValidity()) {
        cardSaveButton.classList.add('popup__button_active');
    } else {
        cardSaveButton.classList.remove('popup__button_active');
    }
    cardSaveButton.disabled = !addNewCardForm.checkValidity();
});


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

//---//
closeAvatarEdit.addEventListener('click', () => {
    popupAvatar.close();
});

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

avatarForm.addEventListener('input', function () {
    if (avatarLink.checkValidity()) {
        avatarSaveButton.classList.add('popup__button_active');
    } else {
        avatarSaveButton.classList.remove('popup__button_active');
    }
    avatarSaveButton.disabled = !avatarForm.checkValidity();
});

avatarForm.addEventListener('submit', () => {
    event.preventDefault();
    avatar.style.backgroundImage = 'url(' + avatarForm.elements.link.value + ')';
    api.editAvatar(avatarForm.elements.link.value);
    popupAvatar.close();
})

showNewCardPopupButton.addEventListener('click', function () {
    popup.open();
});

newCardCloseButton.addEventListener('click', function () {
    popup.close();
    addNewCardForm.reset();
});

addNewCardForm.addEventListener('submit', function (event) {
    event.preventDefault();
    cardListContainer.addCard(addNewCardForm.elements.name.value, addNewCardForm.elements.link.value);
    api.saveNewCard(addNewCardForm.elements.name.value, addNewCardForm.elements.link.value);
    popup.close();
    addNewCardForm.reset();
});



avatar.addEventListener('click', () => {
    popupAvatar.open();
});

showEditProfileButton.addEventListener('click', function () {
    getInfoForForm();
    popupEdit.open();
});

closeEditProfileButton.addEventListener('click', function () {
    popupEdit.close();
});

editCardForm.addEventListener('submit', function () {
    popupEdit.close();
});


editCardForm.addEventListener('submit', function () {
    newEditProfileInfo.edit(event);
});

cardList.addEventListener('click', openImageFullsize);
closeImageButton.addEventListener('click', closeImageFullsize);