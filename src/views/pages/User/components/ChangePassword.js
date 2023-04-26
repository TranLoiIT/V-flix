/* eslint-disable indent */
import { Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { VscClose } from 'react-icons/vsc';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { adminActions } from 'state/modules/admin';
import { errorActions, errorSelectors } from 'state/modules/error';
import { userActions } from 'state/modules/user';
import validation from 'utils/validation';

const ChangePassword = (props) => {
  const { modalChangePassword, toggleModalChangePassword, user } = props;
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const error = useSelector((state) => errorSelectors.error(state));

  const isAdmin = pathname.indexOf('admin') !== -1;

  const [state, setState] = useState({
    oldPassword: '',
    newPassword: '',
    reNewPassword: '',
  });
  const [validate, setValidate] = useState('');
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    if (error.id === 'CHANGE_PASSWORD_FAIL') {
      setMsg(error.msg.msg);
    } else {
      setMsg(null);
    }
  }, [error]);

  useEffect(() => {
    return () => {
      dispatch(errorActions.clearErrors());
    };
    // eslint-disable-next-line
  }, []);

  const handleSubmitChangePassword = async (e) => {
    try {
      e.preventDefault();
      const dataPassword = {
        oldPassword: state.oldPassword,
        newPassword: state.newPassword,
      };
      if (
        !validation(state.oldPassword, state.newPassword, state.reNewPassword)
      ) {
        setValidate('Điền tất cả ô trống');
      } else if (state.newPassword !== state.reNewPassword) {
        setValidate('Mật khẩu nhập lại không khớp');
      } else {
        setValidate('');
        isAdmin
          ? dispatch(adminActions.changePasswordAdmin(dataPassword))
          : dispatch(
              userActions.changePasswordUser({
                id: user.get('_id'),
                dataPassword,
              }),
            );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const clearValue = () => {
    setValidate('');
    setState({
      ...state,
      oldPassword: '',
      newPassword: '',
      reNewPassword: '',
    });
  };

  return (
    <Modal
      open={modalChangePassword}
      onClose={() => {
        clearValue();
        toggleModalChangePassword();
      }}
      aria-labelledby='simple-modal-title'
      aria-describedby='simple-modal-description'
      className='flex items-center justify-center'
    >
      <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
        <div
          className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
          onClick={() => {
            clearValue();
            toggleModalChangePassword();
          }}
        >
          <VscClose className='text-30 text-white' />
        </div>
        <h3 className='text-30 lg:text-40 text-white font-bold mb-2'>
          Đổi mật khẩu
        </h3>
        <p className='text-16 sm:text-18 text-red-primary text-center mb-10 w-30rem sm:w-35rem'>
          <strong>Lưu ý:</strong>
          {` Thay đổi mật khẩu sẽ tự động đăng xuất trên tất cả các thiết bị
                kể cả thiết bị này`}
        </p>
        <form onSubmit={handleSubmitChangePassword}>
          {!msg ? null : (
            <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-16 sm:text-18 py-4 px-6 text-red-500 w-30rem sm:w-35rem text-center'>
              {msg}
            </div>
          )}
          {!validate ? null : (
            <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-18 py-4 px-6 text-red-500 w-30rem sm:w-35rem text-center'>
              {validate}
            </div>
          )}
          <input
            type='password'
            value={state.oldPassword}
            className='bg-gray-primary-d text-white text-16 sm:text-18 px-8 py-6 mb-4 rounded-md w-30rem sm:w-35rem block'
            onChange={(e) => {
              setState({
                ...state,
                oldPassword: e.target.value,
              });
            }}
            placeholder='Mật khẩu cũ'
          />
          <Link to='/forgot-password' className='text-red-primary text-16 mb-6 block'>
            Quên mật khẩu ?
          </Link>
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
      </div>
    </Modal>
  );
};

ChangePassword.propTypes = {
  modalChangePassword: PropTypes.bool.isRequired,
  toggleModalChangePassword: PropTypes.func.isRequired,
  user: PropTypes.any,
};

ChangePassword.defaultProps = {
  user: {},
};
export default React.memo(ChangePassword);
