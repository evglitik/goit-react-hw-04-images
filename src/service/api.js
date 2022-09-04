import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const KEY = `key=28245288-63872aeeb6359b149a47311c9`;

export const getImages = async (request, page) => {
  const response = await axios.get(
    `/?q=${request}&page=${page}&${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return response.data.hits.map(({ id, webformatURL, largeImageURL }) => {
    return { id, webformatURL, largeImageURL };
  });
};
