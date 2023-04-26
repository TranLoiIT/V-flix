import axios from 'axios';

export const pushNotificationApi = async (slug) => {
  const promise = await axios.post(
    '/api/subscription/push',
    { slug },
    { withCredentials: true },
  );
  return promise;
};

export const createNotificationApi = async (userSubscription) => {
  const promise = await axios.post(
    '/api/subscription',
    { data: userSubscription },
    { withCredentials: true },
  );
  return promise;
};
