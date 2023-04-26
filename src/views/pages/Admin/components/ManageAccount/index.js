import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { RiEditFill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { adminActions, adminSelectors } from 'state/modules/admin';
import { Loading } from 'utils/Loadable';
import ChangeImage from 'views/pages/User/components/ChangeImage';
import ChangePassword from 'views/pages/User/components/ChangePassword';

const ManageAccount = () => {
  const dispatch = useDispatch();
  const admin = useSelector((state) => adminSelectors.admin(state));
  const isLoading = useSelector((state) => adminSelectors.isLoading(state));
  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );

  const [state, setState] = useState({
    imageAdmin: '',
    switchMode: false,
    modalImage: false,
    modalChangePassword: false,
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      setState({
        ...state,
        imageAdmin: admin.get('imageAdmin'),
      });
    }
    // eslint-disable-next-line
  }, [admin]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataAdmin = {
      imageAdmin:
        admin.get('imageAdmin') === state.imageAdmin
          ? undefined
          : state.imageAdmin,
      isUpload: state.switchMode,
    };
    dispatch(adminActions.updateAdmin(dataAdmin));
    setState({
      ...state,
      switchMode: false,
    });
  };

  return (
    <div className='manageAccount h-screen flex justify-center items-center flex-col'>
      <Helmet>
        <title>Admin - Quản lý tài khoản</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : !isAuthenticated ? (
        <Redirect to='/admin' />
      ) : (
        <>
          <ChangeImage
            modalImage={state.modalImage}
            toggleModalImage={toggleModalImage}
            toggleSwitchMode={() => {
              setState({
                ...state,
                switchMode: !state.switchMode,
                imageAdmin: '',
              });
            }}
            switchMode={state.switchMode}
            onChange={(value) => {
              setState({
                ...state,
                imageAdmin: value,
              });
            }}
            image={state.imageAdmin}
            id='imageAdmin'
          />
          <ChangePassword
            modalChangePassword={state.modalChangePassword}
            toggleModalChangePassword={toggleModalChangePassword}
          />
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
                    !state.imageAdmin
                      ? admin.get('imageAdmin')
                      : state.imageAdmin
                  }
                  className='w-full h-full object-cover'
                  alt='avatar'
                />
              </div>
            </div>
            <button
              type='submit'
              disabled={admin.get('imageAdmin') === state.imageAdmin}
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
        </>
      )}
    </div>
  );
};

export default ManageAccount;
