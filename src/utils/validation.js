const validation = (...data) => {
  if (data.indexOf('') === -1) {
    return true;
  }
  return false;
};

export default validation;
