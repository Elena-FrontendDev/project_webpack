import {api} from '../api';

const container = document.querySelector('.root');
const userInfo = container.querySelector('.user-info__data');
const editCardForm = document.forms.edit;

//Class for save new information in the form on the server

export default class NewEditProfileInfo {
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

//Function for add name and job information in edit profile form

export function getInfoForForm() {
  const nameForm = editCardForm.elements.name;
  const jobForm = editCardForm.elements.about;
  nameForm.value = userInfo.querySelector(".user-info__name").textContent;
  jobForm.value = userInfo.querySelector(".user-info__job").textContent;
}

//Function for add user information in the edit profile form

function editProfileInfo(nameValue, aboutValue) {

  userInfo.querySelector(".user-info__name").textContent = nameValue;
  userInfo.querySelector(".user-info__job").textContent = aboutValue;
}