import axios from 'axios';

const path = '/api/films';

export const getAFilmApi = async (slug) => {
  const promise = await axios.get(`${path}?slug=${slug}`, {
    withCredentials: true,
  });
  return promise;
};

export const getAFilmAndRelated = async (slug) => {
  const promise = await axios.get(`${path}/related?slug=${slug}`, {
    withCredentials: true,
  });
  return promise;
};

export const getFilmsRecentApi = async (history) => {
  const promise = await axios.post(
    `${path}/recent`,
    { history },
    { withCredentials: true },
  );
  return promise;
};

export const getFilmsFilterApi = async (filter) => {
  const promise = await axios.get(`${path}/filter${filter}`, {
    withCredentials: true,
  });
  return promise;
};

export const addFilmApi = async (data) => {
  const promise = await axios.post(path, data, { withCredentials: true });
  return promise;
};

export const updateFilmApi = async (slug, data) => {
  const promise = await axios.patch(`${path}/${slug}`, data, {
    withCredentials: true,
  });
  return promise;
};

export const deleteFilmApi = async (slug) => {
  const promise = await axios.delete(`${path}/${slug}`, {
    withCredentials: true,
  });
  return promise;
};

export const checkSlugApi = async (slug) => {
  const promise = await axios.get(`${path}/checkSlug/${slug}`, {
    withCredentials: true,
  });
  return promise;
};
