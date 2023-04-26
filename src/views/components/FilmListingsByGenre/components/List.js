/* eslint-disable max-lines */
/* eslint-disable indent */
/* eslint-disable max-len */
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaPlay, FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import { VscClose } from 'react-icons/vsc';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriesSelectors } from 'state/modules/categories';
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter';
import Gallery from 'views/components/Gallery';
import RatingStar from 'views/components/RatingStar';

const List = (props) => {
  const { films, className, order, numItemPerList, margin, related } = props;
  const [currentFilm, setCurrentFilm] = useState({});
  const [modalFilm, setModalFilm] = useState(false);
  const [muted, setMuted] = useState(false);
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const toggleModalFilm = () => {
    setModalFilm(!modalFilm);
  };

  const handleGetFilm = (film) => {
    setCurrentFilm(film);
  };

  return (
    <ul
      className={`filmListingsByGenre__list flex-1 flex flex-listFilm ${className}`}
      style={{
        order,
      }}
    >
      <Modal
        open={modalFilm}
        onClose={toggleModalFilm}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='overflow-auto pb-4rem'
      >
        <div className='filmListingsByGenre__modalFilm absolute top-4rem left-1/2 transform -translate-x-1/2 bg-black-body flex items-center flex-col w-4/5 sm:w-3/4 2xl:w-1/2 overflow-hidden rounded-2xl outline-none relative mb-4rem'>
          <div className='filmListingsByGenre__modalFilm-main p-previewFilm w-full absolute'>
            <ReactPlayer
              url={currentFilm.trailerURL}
              playing
              loop
              muted={muted}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}
              width='100%'
              height='100%'
              config={{
                trailer: {
                  playerVars: {
                    fs: 0,
                  },
                },
              }}
            />
          </div>
          <div className='filmListingsByGenre__modalFilm-main-cover z-1 bg-coverModalFilm p-previewFilm w-full relative'>
            <h3 className='text-30 2xl:text-40 text-white font-bold w-50rem absolute left-4rem bottom-16rem'>
              {currentFilm.title}
            </h3>
            <div className='absolute bottom-6rem right-4rem cursor-pointer' onClick={() => setMuted(!muted)}>
              {muted ? <FaVolumeMute className='text-40 text-white leading-20' /> : <FaVolumeUp className='text-40 text-white leading-20' />}
            </div>
            <div
              className='absolute top-3rem right-4rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
              onClick={toggleModalFilm}
            >
              <VscClose className='text-30 text-white' />
            </div>
            <div className='absolute bottom-13rem left-4rem'>
              <RatingStar
                className='filmListingsByGenre__modalFilm-main-rating'
                ratingPercent={
                  !currentFilm.reviews
                    ? 0
                    : currentFilm.reviews.length === 0
                    ? 0
                    : (currentFilm.reviews.reduce(
                        (average, review) => average + review.rating,
                        0,
                      ) /
                        currentFilm.reviews.length /
                        5) *
                      100
                }
              />
            </div>
            <Link
              to={`/film/${currentFilm.slug}`}
              className='bg-white hover:bg-opacity-70 rounded-lg text-20 2xl:text-24 text-black-body py-3 px-16 font-bold absolute left-4rem bottom-6rem'
              onClick={() => {
                toggleModalFilm();
              }}
            >
              <FaPlay className='inline-block mr-6' />
              Phát
            </Link>
          </div>
          <div className='filmListingsByGenre__modalFilm-info relative px-4rem pb-4rem flex'>
            <div className='filmListingsByGenre__modalFilm-info-desc text-white text-18 w-3/5 mr-10'>
              <span className='block text-20 font-bold mb-2'>Nội dung</span>
              <span>{currentFilm.description}</span>
            </div>
            <div className='filmListingsByGenre__modalFilm-info-desc text-14 w-2/5'>
              <div className='mb-4'>
                <span className='text-gray-primary'>Diễn viên:</span>
                <span className='capitalize text-white'>
                  {currentFilm.actor
                    ? ` ${capitalizeFirstLetter(currentFilm.actor?.join(', '))}`
                    : ''}
                </span>
              </div>
              <div>
                <span className='text-gray-primary'>Thể loại:</span>
                <ul className='text-white inline-block'>
                  <>&nbsp;</>
                  {currentFilm.genre
                    ? categories
                        .filter((item) => {
                          for (let i = 0; i < currentFilm.genre.length; i++) {
                            if (item.genre === currentFilm.genre[i]) {
                              return true;
                            }
                          }
                          return false;
                        })
                        .map((item, index) => (
                          <li className='inline-block' key={item._id}>
                            {index === 0 ? '' : <>,&nbsp;</>}
                            <Link
                              to={`/category?genre=${item.genre}`}
                              className='hover:underline'
                            >
                              {item.vn}
                            </Link>
                          </li>
                        ))
                    : null}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Gallery
        films={films}
        numItemPerList={numItemPerList}
        margin={margin}
        handleGetFilm={handleGetFilm}
        toggleModalFilm={toggleModalFilm}
        related={related}
      />
    </ul>
  );
};

List.propTypes = {
  films: PropTypes.array.isRequired,
  className: PropTypes.string.isRequired,
  order: PropTypes.number,
  numItemPerList: PropTypes.number.isRequired,
  margin: PropTypes.string.isRequired,
  related: PropTypes.bool,
};

List.defaultProps = {
  order: 1,
  related: false,
};

export default List;
