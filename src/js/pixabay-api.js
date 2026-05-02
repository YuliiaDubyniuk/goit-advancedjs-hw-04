import axios from 'axios';

export async function getImagesByQuery(query, page_num) {
  const requestParams = {
    key: '38922427-a1320c38255791562f8d90b5f',
    q: query,
    page: page_num,
    per_page: 15,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  const { data } = await axios.get('https://pixabay.com/api', {
    params: requestParams,
  });

  return data;
}
