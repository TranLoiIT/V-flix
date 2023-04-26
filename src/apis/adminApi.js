import axios from 'axios';

export const getAmountAdminApi = async () => {
  const promise = await axios.get('/api/admin/amount', {
    withCredentials: true,
  });
  return promise;
};

export const getAdminApi = async () => {
  const promise = await axios.get('/api/admin', { withCredentials: true });
  return promise;
};

export const changePwUserByAdminApi = async (id, dataPassword) => {
  const promise = await axios.patch(`/api/admin/changePw/${id}`, dataPassword, {
    withCredentials: true,
  });
  return promise;
};

export const changePwAdminApi = async (dataPassword) => {
  const promise = await axios.patch('/api/admin/changePwAdmin', dataPassword, {
    withCredentials: true,
  });
  return promise;
};

export const updateAdminApi = async (dataAdmin) => {
  const promise = await axios.patch('/api/admin/', dataAdmin, {
    withCredentials: true,
  });
  return promise;
};

export const authAdminApi = async ({ loginID, password }) => {
  const promise = await axios.post(
    '/api/admin/auth',
    { loginID, password },
    {
      withCredentials: true,
    },
  );
  return promise;
};

export const logoutAdminApi = async () => {
  const promise = await axios.get('/api/admin/deleteCookie', {
    withCredentials: true,
  });
  return promise;
};
