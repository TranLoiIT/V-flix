import { apiClient } from './SetupAxios';

const path = '/api/films';

export const getAFilmApi = async (slug) => {
  const promise = await apiClient.get(`${path}?slug=${slug}`);
  return promise;
};

export const getAFilmAndRelated = async (slug) => {
  const promise = await apiClient.get(`${path}/related?slug=${slug}`);
  return promise;
};

export const getFilmsRecentApi = async (history) => {
  const promise = await apiClient.get(
    `${path}/recent`,
    { history },
  );
  return promise;
};

export const getFilmsFilterApi = async (filter) => {
  const promise = await apiClient.get(`${path}/filter${filter}`);
  return promise;
};

export const addFilmApi = async (data) => {
  const promise = await apiClient.post(path, data);
  return promise;
};

export const updateFilmApi = async (id, data) => {
  const promise = await apiClient.patch(`${path}/${id}`, data);
  return promise;
};

export const deleteFilmApi = async (id) => {
  const promise = await apiClient.delete(`${path}/${id}`);
  return promise;
};

export const deleteSoftFilmApi = async (id) => {
  const promise = await apiClient.delete(`${path}/soft/${id}`);
  return promise;
};

export const restoreFilmApi = async (id, payload) => {
  const promise = await apiClient.patch(`${path}/${id}`, payload);
  return promise;
};

export const checkSlugApi = async (slug) => {
  const promise = await apiClient.get(`${path}/checkSlug/${slug}`);
  return promise;
};

export const updateEpisode = async (id, param) => {
  const res = await apiClient.patch(`/api/episodes/${id}`, param);
  return res;
}

export const addEpisode = async (param) => {
  const res = await apiClient.post(`/api/episodes`, param);
  return res;
}

export const deleteEpisode = async (id) => {
  const res = await apiClient.delete(`/api/episodes/${id}`);
  return res;
}
