const container = document.querySelector('.root');
const popupWithImage = container.querySelector('.popup__image');


//Add url and full size for image by click

export function openImageFullsize(event) {
  let linkForFullSize = event.target.style.backgroundImage.split(', ', 1);
  linkForFullSize = linkForFullSize[0].slice(5, linkForFullSize.length - 3)

  let imageFullsize = container.querySelector('.popup__image_fullsize');
  imageFullsize.setAttribute('src', linkForFullSize);

  if (event.target.classList.contains('place-card__image')) {
    popupWithImage.classList.add('popup__image_fullsize_is-opened');
  }
}


// Close full size for image by click on the button

export function closeImageFullsize() {
  popupWithImage.classList.remove('popup__image_fullsize_is-opened');
}