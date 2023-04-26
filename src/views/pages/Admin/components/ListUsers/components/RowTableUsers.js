import { Switch, withStyles } from '@material-ui/core';
import { updateUserApi } from 'apis/userApi';
import dateFormat from 'dateformat';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const RowTableUsers = (props) => {
  const { user, index, handleUpdateUser, handleChangePassword, handleSnackBar } = props;
  const { userName, userEmail, isActive, imageUser, date } = user;
  const [isSwitch, setIsSwitch] = useState(isActive);

  const RedSwitch = withStyles({
    switchBase: {
      color: 'rgb(173, 0, 9)',
      '&$checked': {
        color: 'rgb(229, 9, 20)',
      },
      '&$checked + $track': {
        backgroundColor: 'rgb(229, 9, 20)',
      },
    },
    checked: {},
    track: {},
  })(Switch);

  return (
    <tr key={user._id}>
      <td className='text-center pl-3rem pt-4'>{index + 1}</td>
      <td className=''>
        <div className='p-square block relative left-1/2 transform -translate-x-1/2'>
          <LazyLoadImage
            alt={imageUser}
            effect='blur'
            src={imageUser}
            wrapperClassName='listUsers__table--img w-full h-full absolute top-0 left-0'
          />
        </div>
      </td>
      <td>{userName}</td>
      <td>{userEmail}</td>
      <td>{dateFormat(new Date(date), 'dddd, mmmm dS, yyyy, h:MM TT')}</td>
      <td>
        <div className='flex justify-center'>
          <RedSwitch
            checked={isSwitch}
            onChange={() => {
              setIsSwitch(!isSwitch);
              updateUserApi(user._id, { isActive: !isSwitch });
              handleSnackBar('Cập nhật trạng thái người dùng thành công')
            }}
            name='isActive'
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </div>
      </td>
      <td className='flex justify-center'>
        <button
          type='button'
          onClick={() => handleUpdateUser(user)}
          className='flex justify-center cursor-pointer mr-10'
        >
          <FaEdit className='text-blue-facebook hover:text-blue-facebook-d text-22 transition-all duration-200' />
        </button>
        <button type='button' onClick={() => handleChangePassword(user)}>
          <RiLockPasswordFill className='text-22 text-orange-primary transition-all duration-200 hover:text-orange-primary-d' />
        </button>
      </td>
    </tr>
  );
};

RowTableUsers.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  handleUpdateUser: PropTypes.func.isRequired,
  handleChangePassword: PropTypes.func.isRequired,
  handleSnackBar: PropTypes.func.isRequired
};

export default RowTableUsers;
