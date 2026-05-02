import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const createGallery = images => {
  return images
    .map(img => {
      return `<li class="gallery-item">
  <a class="gallery-link" href=${img.largeImageURL}>
    <img class="gallery-image" src="${img.webformatURL}" alt="${img.tags}"/>
  </a>
  <ul class="img-info-list">
    <li class="img-info-item">
      <p class="info-type">Likes</p>
      <p class="img-info">${img.likes}</p>
    </li>
    <li class="img-info-item">
      <p class="info-type">Views</p>
      <p class="img-info">${img.views}</p>
    </li>
    <li class="img-info-item">
      <p class="info-type">Comments</p>
      <p class="img-info">${img.comments}</p>
    </li>
    <li class="img-info-item">
      <p class="info-type">Downloads</p>
      <p class="img-info">${img.downloads}</p>
    </li>
  </ul>
</li>`;
    })
    .join('');
};

export const lightBoxGalery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export const clearGallery = gallery => {
  gallery.innerHtml = '';
};

export const showLoader = loader => {
  loader.classList.add('is-active');
};

export const hideLoader = loader => {
  loader.classList.remove('is-active');
};

export const showLoadMoreButton = btn => {
  btn.classList.remove('is-hidden');
};

export const hideLoadMoreButton = btn => {
  btn.classList.add('is-hidden');
};
