import { galleryItems } from './gallery-items.js';
// Change code below this line

function galleryContainerMarkupMaker(gallery) {
  const galleryContainer = gallery
    .map(
      ({ preview, original, description }) =>
        `<div class="gallery__item">
    <a class="gallery__link" href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"
      />
    </a>
  </div>`
    )
    .join('');
  return galleryContainer;
}

function onGalleryElClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }
  openFullImgInModal(evt.target.dataset.source);
}

function openFullImgInModal(sourceImg) {
  const instance = basicLightbox.create(
    `
    <img src="${sourceImg}" width="800" height="600">
`,
    {
      onShow: (instance) => {
        document.addEventListener('keydown', onEscapeClose);
        function onEscapeClose(evt) {
          if (evt.code === 'Escape') {
            instance.close();
            document.removeEventListener('keydown', onEscapeClose);
          }
        }
      },
    }
  );
  instance.show();
}

const galleryEl = document.querySelector('.gallery');

galleryEl.insertAdjacentHTML(
  'beforeend',
  galleryContainerMarkupMaker(galleryItems)
);

galleryEl.addEventListener('click', onGalleryElClick);
