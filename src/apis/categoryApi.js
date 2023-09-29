import { apiClient } from './SetupAxios';

export const getCategoriesApi = async () => {
  const promise = await apiClient.get('/api/categories');
  return promise;
};

export const addCategoryApi = async (data) => {
  const promise = await apiClient.post('/api/categories', data);
  return promise;
};
