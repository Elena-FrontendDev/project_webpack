const container = document.querySelector('.root');
const popupWithImage = container.querySelector('.popup__image');

//Add url and full size for image by click
export function openImageFullsize (event) {

    const link = event.target.style.backgroundImage.slice(5, event.target.style.backgroundImage.length - 2);
    const imageFullsize = container.querySelector('.popup__image_fullsize');
    imageFullsize.setAttribute('src', link);
    
    if(event.target.classList.contains('place-card__image')) {
      popupWithImage.classList.add('popup__image_fullsize_is-opened');
    }
  } 

// Close full size for image by click on the button
export function closeImageFullsize() {
    popupWithImage.classList.remove('popup__image_fullsize_is-opened');
  }
  