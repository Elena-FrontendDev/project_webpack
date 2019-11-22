
const container = document.querySelector('.root');
const showNewCardPopupButton = container.querySelector('.user-info__button');
const newCardCloseButton = container.querySelector('.popup__close');
const addNewCardButton = container.querySelector('.popup__button');
const cardList = container.querySelector('.places-list');
const addNewCardForm = document.forms.new;

const showEditProfileButton = container.querySelector('.edit-profile__button');
const userInfo = container.querySelector('.user-info__data');
const closeEditProfileButton = container.querySelector('.popup__edit-profile__close');
const editCardForm = document.forms.edit;
const cardImage = container.querySelector('.place-card__image');
const closeImageButton = document.querySelector('.popup__image_close');
const popupWithImage = container.querySelector('.popup__image');

const username = document.querySelector('#username');
const userinfo = document.querySelector('#userinfo');
const editSaveButton = editCardForm.querySelector('.popup__button');
const cardname = document.querySelector('#cardname');
const cardlink = document.querySelector('#cardlink');
const cardSaveButton = addNewCardForm.querySelector('.popup__button');



// 9_Sprint

//Class Declaration

class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.token = options.token;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: {authorization: this.token}
    })
    .then((res) => {
      if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err)=> {
      console.log(`Ошибка: ${err}`);
    }) 
  }

  getProfileInfo() {
   return fetch(`${this.url}/users/me`, {
      headers: {authorization: this.token}
    })
    .then((res) => {
      if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })   
    .catch((err)=> {
      console.log(`Ошибка: ${err}`);
    })
  }

  sendEditProfileInfo(nameValue, aboutValue) {

    return fetch(`${this.url}/users/me`, {
      method: 'PATCH', 
        headers: {authorization: this.token, 
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: nameValue,
        about: aboutValue
      })
    }) 
    .then((res) => {
      if (res.ok) {
      return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })   
    .catch((err)=> {
      console.log(`Ошибка: ${err}`);
    })
  }

}

const options = {baseUrl: 'http://95.216.175.5/cohort4', token: '34297802-4775-4606-acce-9817fbd4faf0'}
const api = new Api(options);

function renderResult (text) {
  result.textContent = text;
  error.textContent = '';
}


/*function renderError (err) {
  error.textContent = err;
  result.textContent = '';
} */

//Class for getting information in the form from the server

class ProfileInfo {
  constructor(userNameInfo, userJobInfo, userAvatar, api) {
    this.api = api;
    this.userNameInfo = userInfo.querySelector(userNameInfo);
    this.userJobInfo = userInfo.querySelector(userJobInfo);
    this.userAvatar = document.querySelector(userAvatar);
    this.info();
  }

  info() {
    this.api.getProfileInfo()
    .then((data)      => {
      this.userNameInfo.textContent = data.name;
      this.userJobInfo.textContent = data.about;
      this.userAvatar.style.backgroundImage = 'url('+data.avatar+')';
    });
  } 

  }

  const profileInfo = new ProfileInfo('.user-info__name', '.user-info__job', '.user-info__photo', api);


  //Class for save new information in the form on the server

  class NewEditProfileInfo {
    constructor(name, about) {
      this.api = api;
      this.name = document.querySelector(name);
      this.about = document.querySelector(about);
    }

    edit(event) {
      event.preventDefault();
      editProfileInfo(this.name.value, this.about.value);
      this.api.sendEditProfileInfo(this.name.value, this.about.value);
    }
    
  }
 
  const newEditProfileInfo = new NewEditProfileInfo('.popup__input_type_edit-name', '.popup__input_type_about')


//Class for create, like and delete card

class Card {
  constructor (title, link) {
    this.cardElement = this.createCard(title, link);
    this.cardElement.querySelector('.place-card__like-icon').addEventListener('click', this.like);
    this.cardElement.querySelector('.place-card__delete-icon').addEventListener('click', this.delete);
  }

  createCard(titleValue, linkValue) {
   const placeCard = document.createElement("div");
   placeCard.classList.add("place-card");
  
   placeCard.innerHTML = `
     <div class="place-card__image">
       <button class="place-card__delete-icon"></button>
     </div>
     <div class="place-card__description">
       <h3 class="place-card__name"></h3>
       <button class="place-card__like-icon"></button>
     </div>`;
   
     placeCard.querySelector(".place-card__name").textContent = titleValue;
     placeCard.querySelector(".place-card__image").style.backgroundImage = 'url('+linkValue+')';
  
  
    return placeCard;
  }

  like(event) {
      event.target.classList.toggle('place-card__like-icon_liked')
  }

  delete(event) {
      event.target.closest('.place-card').remove();
  }
}


//Class for initial cards on loading page

class CardList {
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

const cardListContainer = new CardList(document.querySelector('.places-list'), api);
 
// Class for popup

class Popup {
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

const popup = new Popup(container.querySelector('.popup')); 
const popupEdit = new Popup(container.querySelector('.popup__edit-profile')); 



// 7_Sprint

//Function for add name and job information in edit profile form

  function getInfoForForm () {
  const nameForm = editCardForm.elements.name;
  const jobForm = editCardForm.elements.about;
  nameForm.value = userInfo.querySelector(".user-info__name").textContent;
  jobForm.value = userInfo.querySelector(".user-info__job").textContent;
  }


//Function for add user information in the edit profile form

 function editProfileInfo(nameValue, aboutValue) {
  
    userInfo.querySelector(".user-info__name").textContent = nameValue;
    userInfo.querySelector(".user-info__job").textContent = aboutValue; 

    
    /* function sendEditProfileInfo() {
      return fetch(`http://95.216.175.5/cohort4/users/me`, {
        method: 'PATCH', 
          headers: {authorization: '34297802-4775-4606-acce-9817fbd4faf0', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: userInfo.querySelector(".user-info__name").textContent,
          about: userInfo.querySelector(".user-info__job").textContent
      })
      })  

    } */
   // sendEditProfileInfo(); 
 
    //const editInfo = new Api();
    //editInfo.sendEditProfileInfo(nameValue, aboutValue);
 } 

 //Save information from edit profile form in html file 
 /*function editProfileHandler(event) {
  event.preventDefault();

  const name = document.querySelector('.popup__input_type_edit-name');
  const about = document.querySelector('.popup__input_type_about');
  const newUserInfo = editProfileInfo(name.value, about.value);

  //const newEditProfileInfo = new NewEditProfileInfo('.user-info__name', '.user-info__job')
  
  //const newUserInfo = new NewEditProfileInfo(name.value, about.value);

  
  return newUserInfo;
} */


//Add url and full size for image by click
function openImageFullsize (event) {

  const link = event.target.style.backgroundImage.slice(5, event.target.style.backgroundImage.length - 2);
  const imageFullsize = container.querySelector('.popup__image_fullsize');
  imageFullsize.setAttribute('src', link);
  
  if(event.target.classList.contains('place-card__image')) {
    popupWithImage.classList.add('popup__image_fullsize_is-opened');
  }
} 


// Close full size for image by click on the button
function closeImageFullsize() {
  popupWithImage.classList.remove('popup__image_fullsize_is-opened');
}


//Check validation for profile form

editCardForm.addEventListener('input', function (event) {
  validateInputText(event.target);
  editSaveButton.disabled = !editCardForm.checkValidity();
  activeEditButton();
});

  
function validateInputText(inputText) {
  let error = '';

  if (!inputText.checkValidity()) {
    if (inputText.validity.tooShort || inputText.validity.tooLong) {
      error = 'Должно быть от 2 до 30 символов';     
    }
    if (inputText.validity.valueMissing) {
      error = 'Это обязательное поле';     
    }
  }  
  inputText.nextElementSibling.textContent = error;
} 

//Function for change color for save button
function activeEditButton() {
  if (username.checkValidity() && userinfo.checkValidity()) {
    editSaveButton.classList.add('popup__button_active');
  } else {
    editSaveButton.classList.remove('popup__button_active');
  } 
}


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




// Listeners 

showNewCardPopupButton.addEventListener('click', function () {
  popup.open();
});

newCardCloseButton.addEventListener('click', function () {
  popup.close();
  addNewCardForm.reset();
});

addNewCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  cardListContainer.addCard(addNewCardForm.elements.name.value, addNewCardForm.elements.link.value,)
  popup.close();
  addNewCardForm.reset();
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

/**
 * Здравствуйте
 * Все запросы к стороннему сервису должны быть в рамках класса API, это критично  ** - поправила **
 * 
 * В классе API у вас отсутствует catch, это тоже критично, потому что информация о том что сервер не работает 
 * должна отрабатываться там    ** - поправила **
 * 
 * 
 * 
 * Можно лучше: обычно названия, для примера 'Должно быть от 2 до 30 символов' 
 * выносят в отдельный объект. Допустим может появится задача сделать многоязычный сайт
 * Для примера : const lang = { validationLenght: 'Должно быть от 2 до 30 символов' } 
 * 
 * Можно лучше. То что находится в addEventListener необходимо вынести в отдельный метод класса
 * Вы в будущем можете переиспользовать эти методы по необходимости
 * 
 * Молодцы что используете шаблон при создании карточки
 * 
 * 
  Других замечаний нет
 * 
 * В целом работа неплохая но надо доработать класс API
 * Жду ваших исправлений
 * 
 * 
 */

 /**
  * Если закомментировали код, удаляйте. 
  * Не заставляйте себя и других заострать на таком коде внимание
  * 
  * Работа принимается
  * @koras 
  * 
  */