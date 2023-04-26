import { stylesSelectFilterAdmin } from 'assets/styles/stylesMaterialUI/stylesSelect';
import PropTypes from 'prop-types';
import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import { categoriesSelectors } from 'state/modules/categories';
import sortOptions from '../ListUsers/data';

const FilterAdmin = (props) => {
  const {
    sortData,
    handleSortData,
    handleFlag,
    handleGenreFilter,
    handleSearch,
    handleData,
  } = props;

  const { pathname } = useLocation();
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const genresOptions = categories.map((item) => ({
    value: item.genre,
    label: item.vn,
  }));

  const isManageFilms = pathname.indexOf('films') !== -1;

  return (
    <div className='listFilms__searchFilter bg-black-body mb-6 rounded-xl'>
      <h3 className='text-24 text-white font-bold py-4 px-8 bg-black-navbar border-b border-gray-primary-d rounded-t-xl'>
        {isManageFilms ? 'Bộ lọc phim' : 'Bộ lọc người dùng'}
      </h3>
      <div className='px-8 py-6'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFlag();
          }}
          className='w-full flex items-stretch mb-4'
        >
          <input
            type='text'
            placeholder={
              isManageFilms ? 'Điền tên phim' : 'Điền tên người dùng'
            }
            className='px-6 py-4 shadow-inner-md text-20 flex-1 bg-gray-primary-d focus:outline-none text-white leading-20 rounded-md mr-8'
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            type='submit'
            aria-label='Tìm kiếm'
            className='text-20 text-white bg-red-primary px-16 rounded-md hover:bg-red-primary-d'
          >
            <FaSearch />
          </button>
        </form>
        <div className='flex'>
          {isManageFilms ? (
            <Select
              isMulti
              options={genresOptions}
              styles={stylesSelectFilterAdmin}
              onChange={(option) =>
                handleGenreFilter(option.map((item) => item.value))
              }
              placeholder='Thể loại'
            />
          ) : null}
          <Select
            value={sortData}
            options={sortOptions}
            styles={stylesSelectFilterAdmin}
            onChange={(option) => {
              handleSortData(option);
              if (!option.value) {
                handleFlag();
              } else {
                handleData(option);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

FilterAdmin.propTypes = {
  sortData: PropTypes.object.isRequired,
  handleSortData: PropTypes.func.isRequired,
  handleFlag: PropTypes.func.isRequired,
  handleGenreFilter: PropTypes.func,
  handleSearch: PropTypes.func.isRequired,
  handleData: PropTypes.func.isRequired,
};

FilterAdmin.defaultProps = {
  handleGenreFilter: () => {},
};

export default FilterAdmin;
