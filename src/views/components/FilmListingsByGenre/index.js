/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import { NEXT, PREV } from 'assets/variables/dir';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useSelector } from 'react-redux';
import { userSelectors } from 'state/modules/user';
import handlers from 'utils/handlersSwipe';
import responsive from 'utils/responsive';
import CarouselContainer from '../CarouselContainer';
import List from './components/List';
import './style.scss';

const listProcess = (data, numItemPerList) => {
  const numList = Math.floor(data.length / numItemPerList);
  const listFilmsProcessed = new Array(numList > 1 ? numList : 1);

  for (let i = 0; i < listFilmsProcessed.length; i++) {
    listFilmsProcessed[i] = [];
  }
  let h = 0;
  if (numList >= 1) {
    for (let i = 0; i < numList; i++) {
      for (let j = 0; j < numItemPerList; j++) {
        listFilmsProcessed[i][j] = data[h++];
      }
    }
  } else {
    listFilmsProcessed[0] = data;
  }

  return listFilmsProcessed;
};

const FilmListingsByGenre = (props) => {
  const { numItemPerList, margin } = responsive();
  const { genre, filmsFilter } = props;
  const isAuthenticated = useSelector((state) =>
    userSelectors.isAuthenticated(state),
  );
  const user = useSelector((state) => userSelectors.user(state));

  const listFilmsProcessed = listProcess(filmsFilter, numItemPerList);
  const numItems = listFilmsProcessed.length;

  const [firstNext, setFirstNext] = useState(false);
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
    if (dir === NEXT) {
      setState((newState) => ({
        ...newState,
        dir: NEXT,
        sliding: true,
        pos: newState.pos === numItems - 1 ? 0 : newState.pos + 1,
      }));
      setFirstNext(true);
    } else if (dir === PREV) {
      setState((newState) => ({
        ...newState,
        dir: PREV,
        sliding: true,
        pos: newState.pos === 0 ? numItems - 1 : newState.pos - 1,
      }));
    }
    setTimeout(() => {
      setState((newState) => ({
        ...newState,
        sliding: false,
      }));
    }, 50);
  };

  return (
    <div
      className={`filmListingsByGenre lg:mt-4 relative ${
        genre === 'recent'
          ? 'bg-listFilmAll'
          : genre === 'all'
      }`}
      {...handlers(slide)}
    >
      <h3 className='filmListingsByGenre__title text-18 md:text-24 lg:text-26 xl:text-30 text-white font-bold mb-2 capitalize absolute top-0 left-4%'>
        {genre}
      </h3>
      <div className='overflow-x-hidden xl:pb-16 py-3rem md:py-4rem lg:py-4.5rem xl:py-5rem pl-4% flex w-full'>
        <span
          className={`filmListingsByGenre__control previous transition-all ${
            firstNext ? '' : 'opacity-0 invisible'
          }`}
          onClick={() => slide(PREV)}
        >
          <FiChevronLeft />
        </span>
        <span
          className={`filmListingsByGenre__control next ${
            listFilmsProcessed.length === 1 ? 'opacity-0 invisible' : ''
          }`}
          onClick={() => slide(NEXT)}
        >
          <FiChevronRight />
        </span>
        <CarouselContainer
          dir={state.dir}
          sliding={state.sliding}
          value='0px'
          transition='all 1s ease-in-out'
          length={listFilmsProcessed.length}
        >
          {listFilmsProcessed.map((list, index) => {
            return (
              <List
                numItemPerList={numItemPerList}
                margin={margin}
                key={index}
                films={list}
                order={getOrder({ index, pos: state.pos })}
                className={`${
                  listFilmsProcessed.length === 1
                    ? ''
                    : firstNext
                    ? ''
                    : 'first:opacity-0 first:invisible'
                }`}
              />
            );
          })}
        </CarouselContainer>
      </div>
    </div>
  );
};

FilmListingsByGenre.propTypes = {
  genre: PropTypes.string.isRequired,
  filmsFilter: PropTypes.array.isRequired,
};

export default React.memo(FilmListingsByGenre);
