import axios from 'axios';

export const getUserApi = async () => {
  const promise = await axios.get('/api/user', { withCredentials: true });
  return promise;
};

export const getUsersFilterApi = async (filter) => {
  const promise = await axios.get(`/api/user/filter${filter}`, {
    withCredentials: true,
  });
  return promise;
};

export const authUserApi = async (data) => {
  const promise = await axios.post('/api/user/auth', data, {
    withCredentials: true,
  });
  return promise;
};

export const loginGoogleApi = async (tokenId) => {
  const promise = await axios.post(
    '/api/user/googleLogin',
    {
      tokenId,
    },
    { withCredentials: true },
  );
  return promise;
};

export const loginFacebookApi = async (accessToken, userID) => {
  const promise = await axios.post(
    '/api/user/facebookLogin',
    {
      accessToken,
      userID,
    },
    { withCredentials: true },
  );
  return promise;
};

export const registerApi = async (data) => {
  const promise = await axios.post('/api/user/register', data, {
    withCredentials: true,
  });
  return promise;
};

export const registerNoResApi = async (data) => {
  const promise = await axios.post('/api/user/registerNoRes', data, {
    withCredentials: true,
  });
  return promise;
};

export const logoutUserApi = async () => {
  const promise = await axios.get('/api/user/deleteCookie', {
    withCredentials: true,
  });
  return promise;
};

export const updateUserApi = async (id, dataUser) => {
  const promise = await axios.patch(`/api/user/${id}`, dataUser, {
    withCredentials: true,
  });
  return promise;
};

export const changePwUserApi = async (id, dataPw) => {
  const promise = await axios.patch(`/api/user/changePw/${id}`, dataPw, {
    withCredentials: true,
  });
  return promise;
};

export const forgotPasswordApi = async (email) => {
  const promise = await axios.patch(
    '/api/user/forgotPassword',
    { email },
    { withCredentials: true },
  );
  return promise;
};

export const resetPasswordApi = async (resetLink, newPassword) => {
  const promise = await axios.patch(
    '/api/user/resetPassword',
    { resetLink, newPassword },
    { withCredentials: true },
  );
  return promise;
};
