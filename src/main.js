import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  lightBoxGalery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const refs = {
  searchForm: document.querySelector('.js-form'),
  galleryList: document.querySelector('.js-gallery'),
  loader: document.querySelector('.js-loader'),
  loadMoreBtn: document.querySelector('.js-load-more-btn'),
};

let page = 1;
let totalPages = 0;
let userQuery = '';
const perPage = 15;

const onFormSubmit = async event => {
  try {
    event.preventDefault();

    hideLoadMoreButton(refs.loadMoreBtn);

    const { target: searchForm } = event;
    userQuery = searchForm.elements['search-text'].value.trim();

    // alert user when submit empty form
    if (!userQuery) {
      iziToast.error({
        message: 'Search field cannot be empty. Please enter a keyword.',
        position: 'topRight',
      });

      return;
    }

    clearGallery(refs.galleryList);
    showLoader(refs.loader);

    // reset page to 1 for each new query
    page = 1;

    // request images based on search keyword
    const data = await getImagesByQuery(userQuery, page);
    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please, try again!',
        position: 'topRight',
      });

      return;
    }

    totalPages = Math.ceil(data.totalHits / perPage);

    if (totalPages > 1) {
      showLoadMoreButton(refs.loadMoreBtn);
      refs.loadMoreBtn.addEventListener('click', onLoadMoreBtn);
    }

    // render gallery using request result data
    refs.galleryList.innerHTML = createGallery(data.hits);
    lightBoxGalery.refresh();
    scrollGallery();
  } catch (err) {
    console.log(err);
    iziToast.warning({
      message: 'Oops! Something went wrong. Please, try again!',
      position: 'topRight',
    });
  } finally {
    hideLoader(refs.loader);
    event.target.reset();
  }
};

const onLoadMoreBtn = async event => {
  try {
    page++;

    const data = await getImagesByQuery(userQuery, page);

    refs.galleryList.insertAdjacentHTML('beforeend', createGallery(data.hits));
    scrollGallery();

    if (page === totalPages) {
      hideLoadMoreButton(refs.loadMoreBtn);
      refs.loadMoreBtn.removeEventListener('click', onLoadMoreBtn);
      iziToast.warning({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    console.log(error);
  }
};

refs.searchForm.addEventListener('submit', onFormSubmit);

const scrollGallery = () => {
  const card = document.querySelector('.gallery-item');
  if (card) {
    const { height: cardHeight } = card.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
};
