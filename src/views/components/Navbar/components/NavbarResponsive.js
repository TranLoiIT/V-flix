import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { categoriesSelectors } from 'state/modules/categories';
import { userActions, userSelectors } from 'state/modules/user';

const NavbarResponsive = (props) => {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(search);
  const isAuthenticated = useSelector((state) =>
    userSelectors.isAuthenticated(state),
  );
  const user = useSelector((state) => userSelectors.user(state));
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const { className, toggle } = props;

  return (
    <div
      className={`navbarResponsive bg-black w-full fixed top-0 left-0 h-full z-10 bg-opacity-90 transition-all duration-200 pt-4.1rem lg:pt-6.8rem ${
        className === 'show' ? 'opacity-100 visible' : 'opacity-0 invisible'
      }`}
      onClick={toggle}
    >
      <div
        className={`w-26rem h-full bg-black-body transform transition-all duration-200 ${
          className === 'show' ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='navbarResponsive__header flex flex-col border-b border-gray-primary-d'>
          {!isAuthenticated ? (
            <Link
              to='/login'
              className='navbar__btn bg-red-primary text-white rounded-md mx-auto inline-block my-6 hover:bg-red-primary-d text-16 px-3 py-1 lg:px-7 lg:py-3'
            >
              Đăng nhập
            </Link>
          ) : (
            <>
              <div className='flex ml-6 my-4 items-center'>
                <div className='w-4.5rem h-4.5rem overflow-hidden rounded-lg'>
                  <img
                    src={user.get('imageUser')}
                    alt='avatar'
                    className='object-cover w-full h-full'
                  />
                </div>
                <h3 className='text-18 font-bold flex-1 text-white ml-4 '>
                  {user.get('userName')}
                </h3>
              </div>
              <Link
                to='/user/account'
                className='text-16 mb-4 text-white hover:underline cursor-pointer ml-6'
              >
                Quản lý tài khoản
              </Link>
              <span
                className='text-white cursor-pointer text-16 font-bold hover:underline ml-6 mb-4'
                onClick={() => dispatch(userActions.logout())}
              >
                Đăng xuất
              </span>
            </>
          )}
        </div>
        <ul className='py-2'>
          {categories.map((genre) => (
            <li key={genre._id} className='w-full text-16 font-bold group'>
              <Link
                className={`w-full block py-2 relative text-white opacity-60 group-hover:opacity-100 ${
                  genre.genre === query.get('genre') ? 'opacity-100' : null
                }`}
                style={{
                  paddingLeft: `${(window.innerWidth * 4) / 100}px`,
                }}
                to={`/category?genre=${genre.genre}`}
              >
                <div
                  className={`absolute w-0.25rem h-full top-0 left-0 bg-red-primary opacity-0 ${
                    genre.genre === query.get('genre') ? 'opacity-100' : null
                  }`}
                />
                {genre.vn}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

NavbarResponsive.propTypes = {
  className: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default NavbarResponsive;
