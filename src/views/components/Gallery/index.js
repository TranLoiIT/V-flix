/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React from 'react';
import {
  trackWindowScroll
} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { Link } from 'react-router-dom';
import LazyLoad from './components/LazyLoad';
import './style.scss';

/**
 * Gallery Container Component that loads the films data
 */
const Gallery = (props) => {
  const {
    scrollPosition,
    films,
    numItemPerList,
    margin,
    handleGetFilm,
    toggleModalFilm,
    related,
  } = props;

  return (
    <>
      {films.map((film) => (
        <li
          key={film._id}
          className={`gallery transition duration-200 transform origin-center xl:hover:scale-125 hover:z-1 first:origin-left last:origin-right mx-3 ${
            related ? 'mb-8' : null
          }`}
          style={{
            width: `calc((100% - (${numItemPerList} * ${margin})) / ${numItemPerList})`,
            marginRight: margin,
          }}
        >
          <Link
            to={`/film/${film.slug}`}
            className='p-film gallary__link block'
            aria-label='Đường dẫn phim'
            onClick={(e) => {
              if (window.innerWidth >= 1280) {
                e.preventDefault();
                toggleModalFilm();
                handleGetFilm(film);
              }
            }}
          >
            <LazyLoad scrollPosition={scrollPosition} film={film} />
          </Link>
        </li>
      ))}
    </>
  );
};

Gallery.propTypes = {
  films: PropTypes.array.isRequired,
  scrollPosition: PropTypes.any,
  numItemPerList: PropTypes.number.isRequired,
  margin: PropTypes.string.isRequired,
  handleGetFilm: PropTypes.func.isRequired,
  toggleModalFilm: PropTypes.func.isRequired,
  related: PropTypes.bool,
};

Gallery.defaultProps = {
  scrollPosition: null,
  related: false,
};

export default trackWindowScroll(Gallery);
