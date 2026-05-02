import axios from 'axios';

export function getImagesByQuery(query) {
  const requestParams = new URLSearchParams({
    key: '38922427-a1320c38255791562f8d90b5f',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return axios
    .get(`https://pixabay.com/api/?${requestParams.toString()}`)
    .then(response => {
      return response.data;
    });
}
