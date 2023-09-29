import { apiClient } from './SetupAxios';

export const getAmountAdminApi = async () => {
  const promise = await apiClient.get('/api/admin/amount');
  return promise;
};

export const getAdminApi = async () => {
  const promise = await apiClient.get('/api/admin');
  return promise;
};

export const changePwUserByAdminApi = async (id, dataPassword) => {
  const promise = await apiClient.patch(`/api/admin/changePw/${id}`, dataPassword);
  return promise;
};

export const changePwAdminApi = async (dataPassword) => {
  const promise = await apiClient.patch('/api/admin/changePwAdmin', dataPassword);
  return promise;
};

export const updateAdminApi = async (dataAdmin) => {
  const promise = await apiClient.patch('/api/admin/', dataAdmin);
  return promise;
};

export const authAdminApi = async ({ loginID, password }) => {
  const promise = await apiClient.post(
    '/api/admin/auth',
    { loginID, password },
  );
  return promise;
};

export const logoutAdminApi = async () => {
  const promise = await apiClient.get('/api/admin/deleteCookie');
  return promise;
};
