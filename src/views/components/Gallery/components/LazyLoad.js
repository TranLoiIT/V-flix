import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const LazyLoad = (props) => {
  const {scrollPosition, film} = props;
  const [error, setError] = useState(false);
  
  return (
    <div>
      <LazyLoadImage
        alt={
          error
            ? 'https://res.cloudinary.com/nghiemduong2000/image/upload/v1621406568/VMOflix%20Project/VMOflix%20-%20base/488px-No-Image-Placeholder.svg_zn1ra0.png'
            : film.posterFilm
        }
        effect='blur'
        scrollPosition={scrollPosition}
        src={
          error
            ? 'https://res.cloudinary.com/nghiemduong2000/image/upload/v1621406568/VMOflix%20Project/VMOflix%20-%20base/488px-No-Image-Placeholder.svg_zn1ra0.png'
            : `${process.env.REACT_APP_BASE_API_PREFIX}${film.posterFilm}`
        }
        wrapperClassName='gallery__link-item gallery-img-wrapper w-full h-full absolute top-0'
        onError={() => setError(true)}
      />
      {film.posterFilm}
    </div>
  );
};

LazyLoad.propTypes = {
  scrollPosition: PropTypes.any,
  film: PropTypes.object.isRequired
}

LazyLoad.defaultProps = {
  scrollPosition: null
}

export default LazyLoad;
