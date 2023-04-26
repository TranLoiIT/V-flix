import axios from 'axios';

export const getCategoriesApi = async () => {
  const promise = await axios.get('/api/categories', { withCredentials: true });
  return promise;
};

export const addCategoryApi = async (data) => {
  const promise = await axios.post('/api/categories', data, {
    withCredentials: true,
  });
  return promise;
};
