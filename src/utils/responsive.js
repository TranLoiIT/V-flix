const responsive = () => {
  let numItemPerList;
  let margin;
  if (window.innerWidth >= 1700) {
    numItemPerList = 9;
    margin = '25px';
  } else if (window.innerWidth >= 1536) {
    numItemPerList = 8;
    margin = '25px';
  } else if (window.innerWidth >= 1280) {
    numItemPerList = 7;
    margin = '15px';
  } else if (window.innerWidth >= 1024) {
    numItemPerList = 6;
    margin = '5px';
  } else if (window.innerWidth >= 768) {
    numItemPerList = 5;
    margin = '5px';
  } else if (window.innerWidth >= 360) {
    numItemPerList = 3;
    margin = '5px';
  }
  return { numItemPerList, margin };
};

export default responsive;
