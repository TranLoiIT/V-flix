import { apiClient } from './SetupAxios';

export const pushNotificationApi = async (slug) => {
  const promise = await apiClient.post(
    '/api/subscription/push',
    { slug },
  );
  return promise;
};

export const createNotificationApi = async (userSubscription) => {
  const promise = await apiClient.post(
    '/api/subscription',
    { data: userSubscription },
  );
  return promise;
};
