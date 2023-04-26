/* eslint-disable indent */
import { LinearProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import RatingStar from 'views/components/RatingStar';

const ReviewOverall = (props) => {
  const { reviews } = props;

  const calPercent = (star) => {
    return reviews.length === 0
      ? 0
      : (
          (reviews.filter((review) => review.rating === star).length /
            reviews.length) *
          100
        ).toFixed(1);
  };

  return (
    <div className='reviewFilm__overall'>
      <h4>Đánh giá tổng quan</h4>
      <span>
        {reviews.length === 0
          ? 0
          : (
              reviews.reduce((average, review) => average + review.rating, 0) /
              reviews.length
            ).toFixed(1)}
      </span>
      <div className='reviewFilm__ratingWrap'>
        <RatingStar
          className='reviewFilm__star'
          ratingPercent={
            reviews.length === 0
              ? 0
              : (reviews.reduce(
                  (average, review) => average + review.rating,
                  0,
                ) /
                  reviews.length /
                  5) *
                100
          }
        />
      </div>
      <div className='reviewFilm__progressWrap'>
        <div className='reviewFilm__progress'>
          <RatingStar className='reviewFilm__star' ratingPercent={100} />
          <LinearProgress
            variant='determinate'
            value={parseFloat(calPercent(5))}
            className='reviewFilm__bar'
          />
          <div className='reviewFilm__percent'>{`${calPercent(5)}%`}</div>
        </div>
        <div className='reviewFilm__progress'>
          <RatingStar className='reviewFilm__star' ratingPercent={80} />
          <LinearProgress
            variant='determinate'
            className='reviewFilm__bar'
            value={parseFloat(calPercent(4))}
          />
          <div className='reviewFilm__percent'>{`${calPercent(4)}%`}</div>
        </div>
        <div className='reviewFilm__progress'>
          <RatingStar className='reviewFilm__star' ratingPercent={60} />
          <LinearProgress
            variant='determinate'
            className='reviewFilm__bar'
            value={parseFloat(calPercent(3))}
          />
          <div className='reviewFilm__percent'>{`${calPercent(3)}%`}</div>
        </div>
        <div className='reviewFilm__progress'>
          <RatingStar className='reviewFilm__star' ratingPercent={40} />
          <LinearProgress
            variant='determinate'
            className='reviewFilm__bar'
            value={parseFloat(calPercent(2))}
          />
          <div className='reviewFilm__percent'>{`${calPercent(2)}%`}</div>
        </div>
        <div className='reviewFilm__progress'>
          <RatingStar className='reviewFilm__star' ratingPercent={20} />
          <LinearProgress
            variant='determinate'
            className='reviewFilm__bar'
            value={parseFloat(calPercent(1))}
          />
          <div className='reviewFilm__percent'>{`${calPercent(1)}%`}</div>
        </div>
      </div>
    </div>
  );
};

ReviewOverall.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default ReviewOverall;
