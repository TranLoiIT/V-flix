/* eslint-disable indent */
/* eslint-disable func-names */
import { Snackbar } from '@material-ui/core';
import { getFilmsFilterApi } from 'apis/filmApi';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcCheckmark } from 'react-icons/fc';
import { TiDeleteOutline } from 'react-icons/ti';
import { Link, useLocation } from 'react-router-dom';
import { Loading } from 'utils/Loadable';
import FilterAdmin from '../FilterAdmin';
import sortOptions from '../ListUsers/data';
import RowTableFilms from './components/RowTableFilms';
import './style.scss';

const ListFilms = (props) => {
  const { pathname, state: isUpdated } = useLocation();

  const isBin = pathname.indexOf('bin') !== -1;

  const [state, setState] = useState({
    films: [],
    loading: true,
    flag: true,
    genreFilter: [],
    sortFilms: sortOptions[0],
    search: '',
  });

  const [loading, setLoading] = useState(false);

  // Get data from store
  useEffect(() => {
    (async function () {
      setState({
        ...state,
        loading: true,
      });

      const queryObj = {};

      if (state.genreFilter.length !== 0) {
        queryObj.genre = state.genreFilter;
      }

      if (state.search) {
        queryObj.q = state.search;
      }
      if (isBin) {
        queryObj.bin = true;
      }

      const query = queryString.stringify(queryObj);
      const responseAll = await getFilmsFilterApi(query ? `?${query}` : query);

      setState((newState) => ({
        ...newState,
        sortFilms: sortOptions[0],
        films: responseAll.data,
        loading: false,
      }));
    })();
    // eslint-disable-next-line
  }, [state.flag, state.genreFilter]);

  // useEffect(() => {
  //   if (isUpdated) {
  //     // setMessage(
  //     //   isUpdated === 'update'
  //     //     ? 'Cập nhật phim thành công'
  //     //     : 'Tạo phim thành công',
  //     // );
  //     setLoading(true);
  //   }
  //   // eslint-disable-next-line
  // }, []);

  const handleFlag = () => {
    setState({
      ...state,
      flag: !state.flag,
    });
  };

  const handleSortFilms = (option) => {
    setState({
      ...state,
      sortFilms: option,
    });
  };

  const handleFilms = (option) => {
    setState({
      ...state,
      sortFilms: option,
      films: state.films.sort((a, b) => {
        const reverse = option.value === 'dateZa' || option.value === 'nameZa';
        switch (option.type) {
          case 'name':
            if (reverse) {
              return a.title < b.title ? 1 : a.title > b.title ? -1 : 0;
            }
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
          case 'date':
            return !reverse
              ? new Date(b.date) - new Date(a.date)
              : new Date(a.date) - new Date(b.date);
          default:
            return new Date(b.date) - new Date(a.date);
        }
      }),
    });
  };

  const handleGenreFilter = (value) => {
    setState({
      ...state,
      genreFilter: value,
    });
  };

  const handleSearch = (value) => {
    setState({
      ...state,
      search: value,
    });
  };

  return (
    <div className='listFilms w-4/5 mx-auto relative opacity-80'>
      <Helmet>
        <title>Admin - Quản lý phim</title>
      </Helmet>

      <FilterAdmin
        sortData={state.sortFilms}
        handleData={handleFilms}
        handleSortData={handleSortFilms}
        handleFlag={handleFlag}
        handleGenreFilter={handleGenreFilter}
        handleSearch={handleSearch}
      />
      <div className='bg-black-body flex flex-col pb-6 rounded-xl overflow-hidden'>
        <div className='flex bg-black-navbar px-8 justify-between items-center border-b border-gray-primary-d'>
          <h1 className='listFilms__heading text-24 font-bold text-white py-4'>
            Danh sách phim
          </h1>
          <div className=''>
            <Link
              to='/admin/films/add'
              className='bg-red-primary text-16 text-white py-3 px-6 rounded-md hover:bg-red-primary-d mr-6'
            >
              Thêm phim
            </Link>
            <Link
              to={`/admin/manage/films${isBin ? '' : '/bin'}`}
              className='border border-red-primary text-16 text-red-primary py-3 px-6 rounded-md hover:bg-gray-primary-d'
            >
              {isBin ? 'Danh sách phim' : 'Thùng rác'}
            </Link>
          </div>
        </div>
        {state.loading ? (
          <Loading />
        ) : (
          <div className='listFilms__wrapTable h-70rem'>
            <table>
              <thead>
                <tr>
                  <th className='pl-3rem' style={{ width: '2%' }}>
                    Stt
                  </th>
                  <th>Poster</th>
                  <th style={{ width: '18%' }}>Tên phim</th>
                  <th style={{ width: '14%' }}>Diễn viên</th>
                  <th style={{ width: '14%' }}>Thể loại</th>
                  <th style={{ width: '20%' }}>Nội dung</th>
                  <th className='pr-1rem' style={{ width: '10%' }} colSpan='2'>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.films.map((film, index) => {
                  return (
                    <RowTableFilms key={film._id} film={film} isBin={isBin} index={index} handleFlag={handleFlag} setLoading={setLoading} />
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListFilms;
