import { changePwUserByAdminApi } from 'apis/adminApi';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const ChangePasswordUser = (props) => {
  const { user, toggleModalChangePassword, handleSnackBar } = props;

  const [state, setState] = useState({
    passwordAdmin: '',
    newPassword: '',
    reNewPassword: '',
    error: '',
  });

  const handleSubmitChangePassword = async (e) => {
    try {
      e.preventDefault();
      const dataPassword = {
        passwordAdmin: state.passwordAdmin,
        newPassword: state.newPassword,
      };
      if (state.newPassword !== state.reNewPassword) {
        setState({
          ...state,
          error: 'Mật khẩu nhập lại không khớp',
        });
      } else {
        setState({
          ...state,
          error: '',
        });
        await changePwUserByAdminApi(user._id, dataPassword);
        toggleModalChangePassword();
        handleSnackBar('Đổi mật khẩu thành công')
      }
    } catch (err) {
      console.log(err);
      setState({
        ...state,
        error: err.response.data.msg,
      });
    }
  };

  return (
    <>
      <h3 className='text-30 lg:text-40 text-white font-bold mb-2'>
        Đổi mật khẩu
      </h3>
      <p className='text-16 sm:text-18 text-red-primary text-center mb-10 w-30rem sm:w-35rem'>
        <strong>Lưu ý:</strong>
        {` Thay đổi mật khẩu sẽ tự động đăng xuất trên tất cả các thiết bị
                kể cả thiết bị này`}
      </p>
      <form onSubmit={handleSubmitChangePassword}>
        {!state.error ? null : (
          <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-16 sm:text-18 py-4 px-6 text-red-500 w-30rem sm:w-35rem text-center'>
            {state.error}
          </div>
        )}
        <input
          type='password'
          value={state.passwordAdmin}
          className='bg-gray-primary-d text-white text-16 sm:text-18 px-8 py-6 mb-6 rounded-md w-30rem sm:w-35rem block'
          onChange={(e) => {
            setState({
              ...state,
              passwordAdmin: e.target.value,
            });
          }}
          placeholder='Mật khẩu admin'
        />
        <input
          type='password'
          value={state.newPassword}
          className='bg-gray-primary-d text-white text-16 sm:text-18 px-8 py-6 mb-6 rounded-md w-30rem sm:w-35rem block'
          onChange={(e) => {
            setState({
              ...state,
              newPassword: e.target.value,
            });
          }}
          placeholder='Mật khẩu mới'
        />
        <input
          type='password'
          value={state.reNewPassword}
          className='bg-gray-primary-d text-white text-16 sm:text-18 px-8 py-6 mb-6 rounded-md w-30rem sm:w-35rem block'
          onChange={(e) => {
            setState({
              ...state,
              reNewPassword: e.target.value,
            });
          }}
          placeholder='Nhập lại mật khẩu mới'
        />
        <button
          className='text-16 text-white bg-red-primary px-8 py-6 font-bold rounded-md transition-all duration-200 hover:bg-red-primary-d mt-6 w-full'
          type='submit'
        >
          Thay đổi
        </button>
      </form>
    </>
  );
};

ChangePasswordUser.propTypes = {
  user: PropTypes.any.isRequired,
  toggleModalChangePassword: PropTypes.func.isRequired,
  handleSnackBar: PropTypes.func.isRequired
};

export default ChangePasswordUser;
