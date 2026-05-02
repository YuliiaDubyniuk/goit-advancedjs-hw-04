import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  lightBoxGalery,
} from './js/render-functions';

const refs = {
  searchForm: document.querySelector('.js-form'),
  galleryList: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
};

function onFormSubmit(event) {
  event.preventDefault();

  const { target: searchForm } = event;
  const userQuery = searchForm.elements['search-text'].value.trim();

  if (!userQuery) {
    iziToast.error({
      message: 'Search field cannot be empty. Please enter a keyword.',
      position: 'topRight',
    });

    return;
  }

  clearGallery(refs.galleryList);
    showLoader(refs.loader);
    
    // request images based on search keyword
    getImagesByQuery(userQuery)
    .then(data => {
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please, try again!',
          position: 'topRight',
        });

        return;
      }

    // render gallery using request result data
      refs.galleryList.innerHTML = createGallery(data.hits);
      lightBoxGalery.refresh();
    })
    .catch(err => {
      console.log(err);
      iziToast.warning({
        message: 'Oops! Something went wrong. Please, try again!',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader(refs.loader);
      event.target.reset();
    });
}

refs.searchForm.addEventListener('submit', onFormSubmit);
