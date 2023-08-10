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

export const updateFilmApi = async (id, data) => {
  const promise = await axios.patch(`${path}/${id}`, data, {
    withCredentials: true,
  });
  return promise;
};

export const deleteFilmApi = async (id) => {
  const promise = await axios.delete(`${path}/${id}`, {
    withCredentials: true,
  });
  return promise;
};

export const deleteSoftFilmApi = async (id) => {
  const promise = await axios.delete(`${path}/soft/${id}`, {
    withCredentials: true,
  });
  return promise;
};

export const restoreFilmApi = async (id, payload) => {
  const promise = await axios.patch(`${path}/${id}`, payload);
  return promise;
};

export const checkSlugApi = async (slug) => {
  const promise = await axios.get(`${path}/checkSlug/${slug}`, {
    withCredentials: true,
  });
  return promise;
};

export const updateEpisode = async (id, param) => {
  const res = await axios.patch(`/api/episodes/${id}`, param);
  return res;
}

export const addEpisode = async (param) => {
  const res = await axios.post(`/api/episodes`, param);
  return res;
}

export const deleteEpisode = async (id) => {
  const res = await axios.delete(`/api/episodes/${id}`);
  return res;
}
