// Add imports above this line
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { galleryItems } from './gallery-items';
// Change code below this line
const galleryContainer = document.querySelector('.gallery');

const galleryItemMarkup = galleryItems.map(item => {
    return `<div class="gallery__item">
    <a class="gallery__link" href="${item.original}">
      <img
        class="gallery__image"
        src="${item.preview}"
        data-source="${item.original}"
        alt="${item.description}"
      />
    </a>
  </div>`
}).join('');

galleryContainer.insertAdjacentHTML('afterbegin', galleryItemMarkup);

galleryContainer.addEventListener('click', onClick);

function onClick(evt) {
    evt.preventDefault();

    if (evt.target.nodeName !== 'IMG') {
      return;
   }
    
    const instance = basicLightbox.create(`<img src="${evt.target.dataset.source}"/>`, {
        onShow: (instance) => {
            document.addEventListener('keydown', onEscape);
        },

        onClose: (instance) => {
            document.removeEventListener('keydown', onEscape);
        },
    }
    );
    instance.show();

    function onEscape(evt) {
        if (evt.key === 'Escape') {
            instance.close();
        }
   } 
}

// console.log(galleryItems);

