import cleanAccents from './cleanAccents';

const getSlug = (str) => {
  return cleanAccents(str)
    .toLowerCase()
    .replace(/\(|\)|&|:|,|"/g, '')
    .replace(/ {2}/g, ' ')
    .replace(/\s|'/g, '-');
};

export default getSlug;
