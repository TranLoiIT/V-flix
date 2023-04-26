/* eslint-disable no-nested-ternary */
/* eslint-disable indent */
import PropTypes from 'prop-types';
import React from 'react';
import { FaStar } from 'react-icons/fa';
import './style.scss';

const RatingStar = (props) => {
  const { className, ratingPercent, handleChangeVote } = props;
  return (
    <div className='ratingStar'>
      <div
        className={`ratingStar-wrapper ${className}`}
        onClick={() => handleChangeVote(1)}
      >
        <div
          className='ratingStar--red'
          style={{
            width:
              ratingPercent >= 20 ? '100%' : `${(ratingPercent / 20) * 100}%`,
          }}
        >
          <FaStar />
        </div>
        <FaStar className='ratingStar--gray' />
      </div>
      <div
        className={`ratingStar-wrapper ${className}`}
        onClick={() => handleChangeVote(2)}
      >
        <div
          className='ratingStar--red'
          style={{
            width:
              ratingPercent >= 40
                ? '100%'
                : ratingPercent <= 20
                ? '0%'
                : `${((ratingPercent - 20) / 20) * 100}%`,
          }}
        >
          <FaStar />
        </div>
        <FaStar className='ratingStar--gray' />
      </div>
      <div
        className={`ratingStar-wrapper ${className}`}
        onClick={() => handleChangeVote(3)}
      >
        <div
          className='ratingStar--red'
          style={{
            width:
              ratingPercent >= 60
                ? '100%'
                : ratingPercent <= 40
                ? '0%'
                : `${((ratingPercent - 40) / 20) * 100}%`,
          }}
        >
          <FaStar />
        </div>
        <FaStar className='ratingStar--gray' />
      </div>
      <div
        className={`ratingStar-wrapper ${className}`}
        onClick={() => handleChangeVote(4)}
      >
        <div
          className='ratingStar--red'
          style={{
            width:
              ratingPercent >= 80
                ? '100%'
                : ratingPercent <= 60
                ? '0%'
                : `${((ratingPercent - 60) / 20) * 100}%`,
          }}
        >
          <FaStar />
        </div>
        <FaStar className='ratingStar--gray' />
      </div>
      <div
        className={`ratingStar-wrapper ${className}`}
        onClick={() => handleChangeVote(5)}
      >
        <div
          className='ratingStar--red'
          style={{
            width:
              ratingPercent === 100
                ? '100%'
                : ratingPercent <= 80
                ? '0%'
                : `${((ratingPercent - 80) / 20) * 100}%`,
          }}
        >
          <FaStar />
        </div>
        <FaStar className='ratingStar--gray' />
      </div>
    </div>
  );
};

RatingStar.propTypes = {
  handleChangeVote: PropTypes.func,
  className: PropTypes.string,
  ratingPercent: PropTypes.number.isRequired,
};

RatingStar.defaultProps = {
  handleChangeVote: () => {},
  className: '',
};

export default RatingStar;
