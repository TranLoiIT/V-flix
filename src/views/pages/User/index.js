/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Modal } from '@material-ui/core';
import { updateUserApi } from 'apis/userApi';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RiEditFill, RiErrorWarningLine } from 'react-icons/ri';
import { VscClose } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userActions, userSelectors } from 'state/modules/user';
import { Loading } from 'utils/Loadable';
import ChangeImage from './components/ChangeImage';
import ChangePassword from './components/ChangePassword';

const User = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => userSelectors.user(state));
  const isAuthenticated = useSelector((state) =>
    userSelectors.isAuthenticated(state),
  );
  const isLoading = useSelector((state) => userSelectors.isLoading(state));

  const [state, setState] = useState({
    userName: '',
    imageUser: '',
    switchMode: false,
    modalImage: false,
    modalChangePassword: false,
    modalLock: false,
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
    error: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      setState({
        ...state,
        userName: user.get('userName'),
        imageUser: user.get('imageUser'),
      });
    }
    // eslint-disable-next-line
  }, [user]);

  const toggleModalImage = () => {
    setState({
      ...state,
      modalImage: !state.modalImage,
    });
  };

  const toggleModalChangePassword = () => {
    setState({
      ...state,
      modalChangePassword: !state.modalChangePassword,
    });
  };

  const toggleModalLock = () => {
    setState({
      ...state,
      modalLock: !state.modalLock,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataUser = {
      userName:
        state.userName === user.get('userName') ? undefined : state.userName,
      imageUser:
        user.get('imageUser') === state.imageUser ? undefined : state.imageUser,
      isUpload: state.switchMode,
    };
    dispatch(userActions.updateUser({ id: user.get('_id'), dataUser }));
    setState({
      ...state,

      switchMode: false,
    });
  };

  const handleLock = async () => {
    try {
      dispatch(userActions.logout());
      await updateUserApi(user.get('_id'), { isActive: false });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='user h-screen flex justify-center items-center flex-col'>
      <Helmet>
        <title>VMOflix - Quản lý tài khoản</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : !isAuthenticated ? (
        <Redirect to='/' />
      ) : (
        <>
          <ChangeImage
            modalImage={state.modalImage}
            toggleModalImage={toggleModalImage}
            toggleSwitchMode={() => {
              setState({
                ...state,
                switchMode: !state.switchMode,
                imageUser: '',
              });
            }}
            switchMode={state.switchMode}
            onChange={(value) => {
              setState({
                ...state,
                imageUser: value,
              });
            }}
            image={state.imageUser}
            user={user}
            id='imageUser'
          />
          <ChangePassword
            modalChangePassword={state.modalChangePassword}
            toggleModalChangePassword={toggleModalChangePassword}
            user={user}
          />
          <Modal
            open={state.modalLock}
            onClose={toggleModalLock}
            aria-labelledby='simple-modal-title'
            aria-describedby='simple-modal-description'
            className='flex items-center justify-center'
          >
            <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
              <div
                className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
                onClick={toggleModalLock}
              >
                <VscClose className='text-30 text-white' />
              </div>
              <RiErrorWarningLine className='text-70 text-red-primary' />
              <h3 className='text-30 sm:text-40 font-bold text-red-primary mt-2 pb-4'>
                Cảnh báo
              </h3>
              <p className='text-16 sm:text-18 text-red-primary text-center mb-10 w-30rem sm:w-35rem'>
                Hành động này không được khuyến khích, Tài khoản sẽ bị đăng xuất
                và khóa ngay lập tức, chỉ sử dụng trong trường hợp khẩn cấp
              </p>
              <p className='text-16 sm:text-18 text-red-primary text-center mb-10 w-30rem sm:w-35rem'>
                Để <strong>MỞ KHÓA</strong> xin liên hệ lại với{' '}
                <strong>ADMIN</strong>
              </p>
              <button
                className='text-16 text-white bg-red-primary px-8 py-6 font-bold rounded-md transition-all duration-200 hover:bg-red-primary-d mt-6 w-full'
                type='button'
                onClick={handleLock}
              >
                Tôi đồng ý
              </button>
            </div>
          </Modal>

          <h2 className='text-30 sm:text-50 text-white font-bold mb-20'>
            Quản lý tài khoản
          </h2>
          <form onSubmit={handleSubmit}>
            <div
              className='relative w-14rem sm:w-20rem group mx-auto cursor-pointer mb-12'
              onClick={toggleModalImage}
            >
              <div className='p-quare w-full'>
                <div className='absolute top-0 flex justify-center items-center left-0 w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-200'>
                  <RiEditFill className=' text-40 text-white' />
                </div>
                <img
                  src={
                    !state.imageUser ? user.get('imageUser') : state.imageUser
                  }
                  className='w-full h-full object-cover'
                  alt='avatar'
                />
              </div>
            </div>
            <input
              type='text'
              value={state.userName}
              className='bg-gray-primary-d text-white text-16 sm:text-18 px-8 py-6 mb-6 rounded-md w-30rem sm:w-35rem block'
              onChange={(e) => {
                setState({
                  ...state,
                  userName: e.target.value,
                });
              }}
              placeholder='Tên người dùng'
            />
            <button
              type='submit'
              disabled={
                user.get('userName') === state.userName &&
                user.get('imageUser') === state.imageUser
              }
              className='disabled:bg-gray-primary mx-auto block text-white bg-red-primary text-16 sm:text-18 font-bold py-4 px-10 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
            >
              Lưu
            </button>
          </form>
          <span
            className='text-white text-24 sm:text-30 hover:underline mt-20 cursor-pointer'
            onClick={toggleModalChangePassword}
          >
            Đổi mật khẩu
          </span>
          <span
            className='text-red-primary text-24 sm:text-30 hover:underline mt-4 cursor-pointer'
            onClick={toggleModalLock}
          >
            Khóa tài khoản
          </span>
        </>
      )}
    </div>
  );
};

export default User;


// SERVER_API_URL=
// SERVER_API_PREFIX=

// NODE_ENV=

// PUBLIC_URL=

// REACT_APP_BASE_API_PREFIX='http://localhost:9000/'

// REACT_APP_GOOGLE_CLIENT_ID="751886179657-ivb1fuvbm0dfo1gqh8i7lifsped1b4r3.apps.googleusercontent.com"