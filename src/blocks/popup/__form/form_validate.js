const editCardForm = document.forms.edit;
const editSaveButton = editCardForm.querySelector('.popup__button');
const username = document.querySelector('#username');
const userinfo = document.querySelector('#userinfo');

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