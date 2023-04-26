/* eslint-disable jsx-a11y/label-has-associated-control */
import { updateUserApi } from 'apis/userApi';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import CustomSwitch from 'views/components/CustomSwitch';
import InputImageFile from 'views/components/InputImageFile';
import InputImageUrl from 'views/components/InputImageUrl';

const UpdateUser = (props) => {
  const { setFlag, currentUser, handleSnackBar } = props;

  const [state, setState] = useState({
    switchMode: false,
    imageUser: currentUser.imageUser,
    userName: currentUser.userName,
  });

  const toggleSwitchMode = () => {
    setState({
      ...state,
      switchMode: !state.switchMode,
      imageUser: '',
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const dataUser = {
        userName:
          state.userName === currentUser.userName ? undefined : state.userName,
        imageUser:
          currentUser.imageUser === state.imageUser
            ? undefined
            : state.imageUser,
        isUpload: state.switchMode,
      };
      await updateUserApi(currentUser._id, dataUser);
      handleSnackBar('Cập nhật người dùng thành công')
      setFlag();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className='flex items-center flex-col'>
        <h3 className='text-30 sm:text-40 w-30rem sm:w-unset font-bold text-white mb-16 text-center'>
          Cập nhật người dùng
        </h3>
        <label className='flex items-center justify-center mb-6'>
          <span className='text-16 text-white mr-4'>URL</span>
          <CustomSwitch
            checked={state.switchMode}
            onChange={toggleSwitchMode}
            name='checkedC'
          />
          <span className='text-16 text-white ml-4'>Upload</span>
        </label>
        {state.switchMode ? (
          <InputImageFile
            id='imageUser'
            value={state.imageUser}
            placeholder='Chọn ảnh'
            width='w-18rem'
            setState={(value) => {
              setState({ ...state, imageUser: value });
            }}
            styleContainer='flex-col'
            styleLabel='mt-10'
          />
        ) : (
          <>
            <InputImageUrl
              value={state.imageUser}
              placeholder='URL ảnh'
              className='w-18rem mb-10'
              styleContainer='w-30rem'
              setState={(value) => setState({ ...state, imageUser: value })}
            />
          </>
        )}
        <h3 className='mt-10 text-white text-20 font-bold w-full'>
          Tên người dùng
        </h3>
        <input
          type='text'
          value={state.userName}
          className='bg-gray-primary-d text-white mt-4 text-16 sm:text-18 px-8 py-6 mb-6 rounded-md w-30rem sm:w-full block'
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
            currentUser.userName === state.userName &&
            currentUser.imageUser === state.imageUser
          }
          className='disabled:bg-gray-primary mx-auto block text-white bg-red-primary text-16 sm:text-18 font-bold py-4 px-10 rounded-md mt-8 text-center hover:bg-red-primary-d transition duration-200'
        >
          Lưu
        </button>
      </form>
    </div>
  );
};

UpdateUser.propTypes = {
  currentUser: PropTypes.object.isRequired,
  setFlag: PropTypes.func.isRequired,
  handleSnackBar: PropTypes.func.isRequired,
};

export default UpdateUser;
