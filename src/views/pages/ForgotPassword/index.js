/* eslint-disable max-len */
import { forgotPasswordApi, resetPasswordApi } from 'apis/userApi';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { userActions } from 'state/modules/user';
import { Loading } from 'utils/Loadable';

const ForgotPassword = () => {
  const history = useHistory();
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const {token} = useParams();
  const [state, setState] = useState({
    success: false,
    msg: '',
    loading: false,
    error: ''
  });
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('')

  const isResetPassword = pathname.indexOf('reset-password') !== -1;

  const handleSubmitForgot = async (e) => {
    try {
      e.preventDefault();
      if (email) {
        setState({
          ...state,
          loading: true,
        });
        const response = await forgotPasswordApi(email);
        setState((newState) => ({
          ...newState,
          success: true,
          msg: response.data.msg,
          loading: false,
          error: '',
          validate: ''
        }));
      } else {
        setState({
          ...state,
          validate: 'Vui lòng điền vào ô trống'
        });
      }
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        error: err.response.data.msg,
        validate: ''
      })
    }
  };

  const handleSubmitReset = async (e) => {
    try {
      e.preventDefault();
      if (newPassword) {
        setState({
          ...state,
          loading: true,
        });
        await resetPasswordApi(token, newPassword);
        dispatch(userActions.logout())
        history.push('/login')
      } else {
        setState({
          ...state,
          validate: 'Vui lòng điền vào ô trống'
        });
      }
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        error: err.response.data.msg,
        validate: ''
      })
    }
  }

  return (
    <div className='forgotPassword flex justify-center items-center h-screen bg-black'>
      <Helmet>
        <title>Khôi phục mật khẩu - VMOflix</title>
      </Helmet>
      <div className='login__background w-full h-full opacity-50 absolute'>
        <img
          src='https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_small.jpg'
          srcSet='https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_small.jpg 1000w, https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_medium.jpg 1500w, https://assets.nflxext.com/ffe/siteui/vlv3/92bb3a0b-7e91-40a0-b27b-f2c3ac9ef6e4/b9637692-6620-40e8-ad9d-9ccbd5ef952b/VN-vi-20210322-popsignuptwoweeks-perspective_alpha_website_large.jpg 1800w'
          alt=''
          className='object-cover w-full h-full'
        />
      </div>
      <div className='login__navbar absolute top-0 h-9rem px-4% flex items-center justify-center sm:justify-start w-full'>
        <Link to='/'>
          <img
            className='h-4rem lg:h-4.5rem'
            src='https://res.cloudinary.com/dcrfjkvlm/image/upload/v1693887959/logoVfilx_whdgzd.png'
            alt='Logo'
          />
        </Link>
      </div>
      <form
        onSubmit={isResetPassword ? handleSubmitReset : handleSubmitForgot}
        className='z-1 bg-black bg-opacity-80 px-8 py-14 sm:px-24 sm:py-24 flex flex-col'
      >
        <div className='flex justify-between items-center mb-10'>
          <h3 className='text-30 text-white font-bold'>
            {isResetPassword ? 'Tạo mật khẩu mới' : state.success ? 'Vui lòng kiểm tra email' : 'Khôi phục mật khẩu'}
          </h3>
        </div>
        {state.loading ? <Loading /> : state.success ? (
          <>
            <div className='p-6 bg-gray-primary-d w-30rem sm:w-35rem text-center text-white text-14 rounded-md'>
              <span>Chúng tôi đã gửi yêu cầu khôi phục mật khẩu tới</span>
              <strong>{` ${email}`}</strong>
              <span>. Vui lòng kiểm tra email và làm theo hướng dẫn.</span>
            </div>
            <Link
              to='/'
              className='text-white bg-red-primary text-16 font-bold py-6 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
            >
              Quay về trang chủ
            </Link>
          </>
        ) : (
          <>
            {!state.error ? null : (
              <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-18 py-4 px-6 text-red-500 w-30rem sm:w-35rem text-center'>
                {state.error}
              </div>
            )}
            {!state.validate ? null : (
              <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-18 py-4 px-6 text-red-500 w-30rem sm:w-35rem text-center'>
                {state.validate}
              </div>
            )}
            <input
              type={isResetPassword ? 'password' : 'email'}
              className='bg-gray-primary-d text-white text-16 px-8 py-6 mb-6 rounded-md w-30rem sm:w-35rem'
              placeholder={isResetPassword ? 'Nhập mật khẩu mới' : 'Email của bạn'}
              onChange={(e) => {
                isResetPassword ? setNewPassword(e.target.value) : setEmail(e.target.value)
              }}
              value={isResetPassword ? newPassword : email}
            />
            <button
              type='submit'
              className='text-white bg-red-primary text-16 font-bold py-6 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
            >
              {isResetPassword ? 'Tạo mật khẩu' : 'Khôi phục mật khẩu'}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
