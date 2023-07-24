/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable func-names */
/* eslint-disable react/no-array-index-key */
/* eslint-disable indent */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable max-lines */
/* eslint-disable max-len */
import { Modal } from '@material-ui/core';
import {
  addFilmApi,
  checkSlugApi,
  getAFilmApi,
  updateFilmApi
} from 'apis/filmApi';
import { pushNotificationApi } from 'apis/subscriptionApi';
import { stylesSelectCreateEditFilm } from 'assets/styles/stylesMaterialUI/stylesSelect';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { BiRefresh } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { Redirect, useHistory, useLocation, useParams } from 'react-router-dom';
import Select from 'react-select';
import { adminSelectors } from 'state/modules/admin';
import { categoriesSelectors } from 'state/modules/categories';
import getSlug from 'utils/getSlug';
import { Loading } from 'utils/Loadable';
import validation from 'utils/validation';
import CustomSwitch from 'views/components/CustomSwitch';
import InputImageFile from 'views/components/InputImageFile';
import InputImageUrl from 'views/components/InputImageUrl';
import './style.scss';

const CreateEditFilm = () => {
  const history = useHistory();
  const { pathname } = useLocation();
  const { slug } = useParams();

  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const isAddFilmPage = pathname === '/admin/films/add';

  const [state, setState] = useState({
    currentFilm: {},
    updating: false,
    loading: !isAddFilmPage,
    switchMode: false,
    error: '',
    title: '',
    actor: '',
    description: '',
    genre: [],
    poster: '',
    episodes: [],
  });

  const defaultEpsisode = {
    title: "",
    description: "",
    episode: null,
    video: ""
  }

  const [validate, setValidate] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    if (!isAddFilmPage) {
      const getFilm = async () => {
        try {
          setState({
            ...state,
            loading: true,
          });
          const response = await getAFilmApi(slug);
          const currentFilm = response.data;
          setState((newState) => ({
            ...newState,
            ...currentFilm,
            loading: false,
          }));
        } catch (err) {
          console.log(err);
        }
      };

      getFilm();
    }
    // eslint-disable-next-line
  }, []);

  const progressData = async () => {
    try {
      const dataUpload = {
        title: state.title,
        description: state.description,
        poster: state.poster,
        actor: state.actor.split(',').map((item) => item.trim().toLowerCase()),
        genre: state.genre,
        ...(isAddFilmPage && {episodes: state.episodes}),
      };

      console.log('dataUpload', dataUpload)
      if (isAddFilmPage) {
        setState({
          ...state,
          updating: true,
        });
        await addFilmApi(dataUpload);
        setState({
          ...state,
          updating: false,
        });
        history.push({
          pathname: '/admin/manage/films',
          state: 'add'
        });
        await pushNotificationApi(state.titleSlug);
      } else {
        console.log('11111111111', 11111111111)
        setState({
          ...state,
          updating: true,
        });
        await updateFilmApi(state._id, dataUpload);
        setState({
          ...state,
          updating: false,
        });
        history.push({
          pathname: '/admin/manage/films',
          state: 'update'
        });
      }
      setValidate('');
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAddFilmPage) {
      if (
        validation(
          state.title,
          state.description,
          state.poster,
          state.actor,
        ) &&
        state.genre.length > 0 &&
        state.episodes.length > 0 &&
        !msg
      ) {
        progressData();
      } else {
        setValidate('Vui lòng điền đúng tất cả ô trống');
      }
    } else if (!msg) {
      progressData();
    }
  };

  // const toggleSwitchMode = () => {
  //   setState({
  //     ...state,
  //     switchMode: !state.switchMode,
  //     posterFilm: '',
  //     bannerFilm: '',
  //   });
  // };

  const genresOptions = categories.map((item) => ({
    value: item.genre,
    label: item.vn,
  }));

  const addEpisode = () => {
    setState(
      {
        ...state,
        episodes: [
          ...state.episodes,
          {
            ...defaultEpsisode,
            episode: state.episodes.length + 1,
          },
        ],
      }
      )
  }

  const handleChangeEpsisode = (key, data, index) => {
    const newData = state.episodes;
    newData[index][key] = data;
    setState(
      {
        ...state,
        episodes: newData,
      }
    )
  }

  // console.log(state)

  return (
    <>
      <Helmet>
        <title>
          {isAddFilmPage ? 'Admin - Thêm phim' : 'Admin - Sửa phim'}
        </title>
      </Helmet>
      {!isAuthenticated ? (
        <Redirect to='/admin' />
      ) : state.loading ? (
        <Loading />
      ) : (
        <div className='createReview flex items-center justify-center'>
          <Modal
            open={state.updating}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            className='overflow-auto pb-4rem flex justify-center items-center bg-black-navbar bg-opacity-80'
          >
            <Loading />
          </Modal>
          <div className='createReview__background h-screen fixed top-0 w-full bg-black'>
            <img
              className='w-full h-full object-cover filter blur'
              src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1618500603/VMOflix%20Project/VMOflix%20-%20base/vmoflix-tv-logo_gd1rmx.webp'
              alt=''
            />
          </div>
          <form
            onSubmit={handleSubmit}
            className='createReview__form z-1 bg-black-body bg-opacity-80 py-6 px-4 sm:py-24 sm:px-24 flex flex-col mt-10rem mb-10rem w-11/12 lg:w-90rem'
          >
            <h3 className='text-24 sm:text-30 text-white font-bold mb-4 sm:mb-10'>
              {isAddFilmPage ? 'Thêm phim mới' : 'Sửa phim'}
            </h3>
            {msg ? (
              <div className='mb-8 border-2 border-red-primary rounded-lg text-16 py-4 px-6 text-red-primary'>
                {msg}
              </div>
            ) : null}
            {!validate ? null : (
              <div className='mb-8 border-2 border-red-primary rounded-lg text-16 py-4 px-6 text-red-primary'>
                {validate}
              </div>
            )}
            <label htmlFor='title' className='mb-6'>
              <span className='text-20 text-white mb-2 block'>Tên phim</span>
              <input
                id='title'
                type='text'
                className='createReview__form-input w-full'
                placeholder='Tiêu đề bài viết'
                onChange={(e) => {
                  setState({
                    ...state,
                    title: e.target.value,
                  });
                }}
                value={state.title}
              />
            </label>
            <label htmlFor='actor' className='mb-6'>
              <span className='mb-2 block text-20 text-white'>Diễn viên</span>
              <input
                id='actor'
                type='text'
                className='createReview__form-input w-full'
                placeholder='Diễn viên'
                onChange={(e) => {
                  setState({
                    ...state,
                    actor: e.target.value,
                  });
                }}
                value={state.actor}
              />
            </label>

            <label>
              <span className='mb-2 block text-20 text-white'>Thể loại</span>
              <Select
                isMulti
                defaultValue={categories
                  .filter((item) => {
                    for (let i = 0; i < state.genre.length; i++) {
                      if (item.genre === state.genre[i]) {
                        return true;
                      }
                    }
                    return false;
                  })
                  .map((item) => ({
                    value: item.genre,
                    label: item.vn,
                  }))}
                options={genresOptions}
                styles={stylesSelectCreateEditFilm}
                onChange={(option) =>
                  setState({
                    ...state,
                    genre: option.map((item) => item.value),
                  })
                }
                placeholder='Thể loại'
              />
            </label>
            <label htmlFor='Epsisode' className='my-6 flex justify-between items-center'>
              <div className='text-20 text-white mb-2'>Danh sách tập phim</div>
              <div
                className='text-20 text-white mb-2 py-2 px-4 bg-red-primary rounded-sm cursor-pointer'
                onClick={() => addEpisode()}
              >
                Thêm tập phim
              </div>
            </label>

            {
              (state.episodes || []).map((item, index) => (
                <div className='mt-3 border rounded-lg border-gray-500 p-8 mb-3' key={`episodes_${index}`}>
                  <div className='mb-2 block text-20 text-white'>
                    {
                      `Tập Phim: ${item?.epsisode || 0}`
                    }
                  </div>

                  <div className='mb-2 block text-20 text-white'>Tiêu đề</div>
                  <input
                    type='text'
                    className='createReview__form-input w-full'
                    placeholder='Tiêu đề  phim'
                    onChange={(e) => handleChangeEpsisode('title', e.target.value, index)}
                    value={item.title}
                  />

                  <div className='mb-2 block text-20 text-white'>Mô tả</div>
                  <input
                    type='text'
                    className='createReview__form-input w-full'
                    placeholder='Mô tả phim'
                    onChange={(e) => handleChangeEpsisode('description', e.target.value, index)}
                    value={item.description}
                  />

                  <div className='mb-2 block text-20 text-white'>Video</div>
                  <input
                    type='text'
                    className='createReview__form-input w-full'
                    placeholder='URL video'
                    onChange={(e) => handleChangeEpsisode('video', e.target.value, index)}
                    value={item.video}
                  />


                </div>
              ))
            }

            <label className='flex items-center justify-start mb-6'>
              <span className='text-20 text-white'>Tải lên hình ảnh</span>
            </label>
            <div className='createReview__form-input mb-6 flex'>
              <InputImageFile
                id='poster'
                value={state.poster}
                placeholder='Chọn Poster'
                width='w-14rem'
                setState={(value) => {
                  console.log("value::", value);
                  setState({
                    ...state,
                    poster: value ?? '',
                  });
                }}
                styleContainer='mr-6'
                styleLabel='ml-6'
              />
            </div>
            <label htmlFor='description'>
              <span className='mb-2 block text-20 text-white'>
                Nội dung chính
              </span>
              <textarea
                id='description'
                className='createReview__form-input h-20rem w-full'
                placeholder='Mô tả bài viết'
                onChange={(e) => {
                  setState({
                    ...state,
                    description: e.target.value,
                  });
                }}
                value={state.description}
              />
            </label>
            <button
              type='submit'
              className='text-white bg-red-primary text-16 font-bold py-6 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
            >
              {isAddFilmPage ? 'Thêm phim' : 'Sửa phim'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default CreateEditFilm;
