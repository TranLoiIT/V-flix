/* eslint-disable max-lines */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import React from 'react';
import { FaCaretDown } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { adminActions, adminSelectors } from 'state/modules/admin';
import './style.scss';

const HeaderAdmin = (props) => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) =>
    adminSelectors.isAuthenticated(state),
  );
  const admin = useSelector((state) => adminSelectors.admin(state));

  return (
    <>
      <div className='navbar__wrap top-0 z-20 w-full bg-black-navbar relative'>
        <div className='navbar h-4.1rem lg:h-6.8rem px-4% flex items-center justify-between w-full'>
          <div className='navbar__left flex'>
            <div className='navbar__menu--tablet w-2.5rem z-1 cursor-pointer block lg:hidden mr-6'>
              <span className='navbar__menu--tablet-icon relative transform -translate-y-1/2 top-1/2'>
                &nbsp;
              </span>
            </div>
            <Link className='flex items-center' to='/admin/manage/films'>
              <img
                src='https://res.cloudinary.com/dcrfjkvlm/image/upload/v1693887959/logoVfilx_whdgzd.png'
                alt='Logo'
                className='h-2rem lg:h-2.5rem'
              />
            </Link>
          </div>
          <div className='navbar__right flex'>
            {window.innerWidth < 1024 ? null : !isAuthenticated ? (
              <Link
                to='/login'
                className='navbar__btn bg-red-primary hover:bg-red-primary-d text-14 lg:text-16 px-3 py-1 lg:px-7 lg:py-3'
              >
                Đăng nhập
              </Link>
            ) : (
              <div className='relative group'>
                <div className='flex items-center cursor-pointer'>
                  <div className='w-3.5rem h-3.5rem overflow-hidden rounded-md'>
                    <img
                      className='object-cover w-full h-full'
                      src={admin.get('imageAdmin')}
                      alt='avatar'
                    />
                  </div>
                  <FaCaretDown className='ml-2 text-white text-16 transform transition-all duration-400 group-hover:rotate-180' />
                </div>
                <div className='navbar__right-menuUser absolute w-20rem top-5rem right-0 bg-black bg-opacity-90 border border-gray-primary transition-all duration-200 invisible opacity-0 group-hover:opacity-100 group-hover:visible'>
                  <div className='border-b border-gray-primary-d px-6 py-4 flex flex-col'>
                    <p className='text-white font-bold text-16 mb-4 uppercase'>
                      {admin.get('loginID')}
                    </p>
                    <Link
                      className='text-14 leading-10 block text-white hover:underline'
                      to='/admin/account'
                    >
                      Quản lý tài khoản
                    </Link>
                  </div>
                  <span
                    className='text-14 block text-white font-bold hover:underline cursor-pointer px-6 py-4'
                    onClick={() => dispatch(adminActions.logout())}
                  >
                    Đăng xuất
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAdmin;
