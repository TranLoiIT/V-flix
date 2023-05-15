/* eslint-disable indent */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-array-index-key */
import { NEXT, PREV } from 'assets/variables/dir';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import {
  FaChevronLeft,
  FaChevronRight,
  FaRegCircle,
  FaRegDotCircle,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import handlers from 'utils/handlersSwipe';
import CarouselContainer from '../CarouselContainer';
import RatingStar from '../RatingStar';
import ReadMore from '../ReadMore/ReadMore';
import './style.scss';

const Banner = (props) => {
  const { films } = props;
  const timeInterval = 3000;
  const debounce = useRef(null);
  const filmsFilter = films.slice(0, 4);
  const numItems = filmsFilter.length;

  const [state, setState] = useState({
    pos: 0,
    sliding: false,
    dir: NEXT,
  });

  const getOrder = ({ index, pos }) => {
    const order =
      index - pos < 0 ? numItems - Math.abs(index - pos) : index - pos;
    return order;
  };

  const slide = (dir) => {
    if (debounce.current) {
      clearInterval(debounce.current);
    }
    if (dir === NEXT) {
      setState((newState) => ({
        ...newState,
        dir: NEXT,
        sliding: true,
        pos: newState.pos === numItems - 1 ? 0 : newState.pos + 1,
      }));
    } else if (dir === PREV) {
      setState((newState) => ({
        ...newState,
        dir: PREV,
        sliding: true,
        pos: newState.pos === 0 ? numItems - 1 : newState.pos - 1,
      }));
    }
    debounce.current = setInterval(() => {
      slide(NEXT);
    }, timeInterval);
    setTimeout(() => {
      setState((newState) => ({
        ...newState,
        sliding: false,
      }));
    }, 50);
  };

  useEffect(() => {
    debounce.current = setInterval(() => {
      slide(NEXT);
    }, timeInterval);
    return () => clearInterval(debounce.current);
    // eslint-disable-next-line
  }, []);
  return (
    <>
      <div className='banner mb-3rem' {...handlers(slide)}>
        <div className='banner__slider'>
          <CarouselContainer
            dir={state.dir}
            sliding={state.sliding}
            value='0px'
            transition='all 0.6s ease-in-out'
            length={numItems}
          >
            {(films || []).slice(0, 4).map((film, index) => {
              const { _id, slug, bannerFilm } = film;
              return (
                <Link
                  to={`/film/${slug}`}
                  className='group relative flex flex-carousel'
                  onMouseOver={() => {
                    if (debounce.current) {
                      clearInterval(debounce.current);
                    }
                  }}
                  onMouseOut={() => {
                    debounce.current = setInterval(() => {
                      slide(NEXT);
                    }, timeInterval);
                  }}
                  style={{
                    order: getOrder({ index, pos: state.pos }),
                  }}
                  key={_id || index}
                >
                  <img
                    className='w-full h-full object-cover'
                    src={`${process.env.REACT_APP_BASE_API_PREFIX}${bannerFilm}`}
                    alt='banner'
                  />
                  <div className='opacity-0 banner__slider-item-over flex-col justify-end bg-black absolute w-full h-full top-0 bg-opacity-60 pl-8rem pb-35rem transition duration-300 group-hover:opacity-100 hidden xl:flex'>
                    <h2 className='text-56 text-white font-bold w-80rem leading-65 mb-4'>
                      {film.title}
                    </h2>
                    <div className='mb-8'>
                      <RatingStar
                        className='banner__slider-rating'
                        ratingPercent={
                          (film?.reviews || []).length === 0
                            ? 0
                            : (film?.reviews.reduce(
                                (average, review) => average + review.rating,
                                0,
                              ) /
                                film.reviews.length /
                                5) *
                              100
                        }
                      />
                    </div>
                    <ReadMore text={film?.description || ''} />
                  </div>
                </Link>
              );
            })}
          </CarouselContainer>
        </div>
        <div className='banner__slider-control hidden xl:block'>
          <button
            className='banner__slider-control-previous'
            onClick={() => slide(PREV)}
          >
            <FaChevronLeft />
          </button>
          <button
            className='banner__slider-control-next'
            onClick={() => slide(NEXT)}
          >
            <FaChevronRight />
          </button>
          <ul className='banner__slider-control-indicators'>
            {(films?.slice(0, 4) || []).map((_item, index) => {
              return (
                <li key={index} className='banner__slider-control-dot'>
                  {getOrder({ index, pos: state.pos }) === 1 ? (
                    <FaRegDotCircle className='text-20' />
                  ) : (
                    <FaRegCircle className='text-20' />
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

Banner.propTypes = {
  films: PropTypes.array.isRequired,
};

export default Banner;
