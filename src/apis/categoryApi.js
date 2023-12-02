import { apiClient } from './SetupAxios';

export const getCategoriesApi = async () => {
  const promise = await apiClient.get('/api/categories');
  return promise;
};

export const addCategoryApi = async (data) => {
  const promise = await apiClient.post('/api/categories', data);
  return promise;
};

export const updateCategoryApi = async (id, data) => {
  const promise = await apiClient.patch(`/api/categories/${id}`, data);
  return promise;
};

export const deleteCategoryApi = async (id) => {
  const promise = await apiClient.delete(`/api/categories/${id}`);
  return promise;
};
