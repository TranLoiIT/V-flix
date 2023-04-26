/* eslint-disable react/jsx-no-undef */
/* eslint-disable indent */
import PropTypes from 'prop-types';
import React from 'react';
import ReviewOverall from './components/ReviewOverall';
import ReviewWrite from './components/ReviewWrite';
import './style.scss';

const ReviewFilm = (props) => {
  const { currentFilm, handleUpdateFilm } = props;

  return (
    <div className='reviewFilm'>
      <div>
        <ReviewOverall reviews={currentFilm.reviews} />
        <ReviewWrite
          currentFilm={currentFilm}
          handleUpdateFilm={handleUpdateFilm}
        />
      </div>
    </div>
  );
};

ReviewFilm.propTypes = {
  currentFilm: PropTypes.object.isRequired,
  handleUpdateFilm: PropTypes.func.isRequired,
};

export default ReviewFilm;
