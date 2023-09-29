import { apiClient } from './SetupAxios';

export const getUserApi = async () => {
  const promise = await apiClient.get('/api/user');
  return promise;
};

export const getUsersFilterApi = async (filter) => {
  const promise = await apiClient.get(`/api/user/filter${filter}`);
  return promise;
};

export const authUserApi = async (data) => {
  const promise = await apiClient.post('/api/user/auth', data);
  return promise;
};

export const loginGoogleApi = async (tokenId) => {
  const promise = await apiClient.post(
    '/api/user/googleLogin',
    {
      tokenId,
    },
  );
  return promise;
};

export const loginFacebookApi = async (accessToken, userID) => {
  const promise = await apiClient.post(
    '/api/user/facebookLogin',
    {
      accessToken,
      userID,
    },
  );
  return promise;
};

export const registerApi = async (data) => {
  const promise = await apiClient.post('/api/user/register', data);
  return promise;
};

export const registerNoResApi = async (data) => {
  const promise = await apiClient.post('/api/user/registerNoRes', data);
  return promise;
};

export const logoutUserApi = async () => {
  const promise = await apiClient.get('/api/user/deleteCookie');
  return promise;
};

export const updateUserApi = async (id, dataUser) => {
  const promise = await apiClient.patch(`/api/user/${id}`, dataUser);
  return promise;
};

export const changePwUserApi = async (id, dataPw) => {
  const promise = await apiClient.patch(`/api/user/changePw/${id}`, dataPw);
  return promise;
};

export const forgotPasswordApi = async (email) => {
  const promise = await apiClient.patch(
    '/api/user/forgotPassword',
    { email },
  );
  return promise;
};

export const resetPasswordApi = async (resetLink, newPassword) => {
  const promise = await apiClient.patch(
    '/api/user/resetPassword',
    { resetLink, newPassword },
  );
  return promise;
};
