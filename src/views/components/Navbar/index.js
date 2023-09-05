/* eslint-disable max-lines */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { FaCaretDown, FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { categoriesSelectors } from 'state/modules/categories';
import { userActions, userSelectors } from 'state/modules/user';
import NavbarResponsive from './components/NavbarResponsive';
import './style.scss';

const Navbar = (props) => {
  const { addClass } = props;
  const history = useHistory();
  const inputNode = useRef();
  const dispatch = useDispatch();
  const typingTimeoutRef = useRef(null);
  const { pathname, search } = useLocation();
  const query = new URLSearchParams(search);
  const [scrolling, setScrolling] = useState(false);
  const [showSearchBox, setShowSearchBox] = useState(pathname === '/search');
  const [showGenre, setShowGenre] = useState(false);
  const [showMenuResponsive, setShowMenuResponsive] = useState(false);

  const isAuthenticated = useSelector((state) =>
    userSelectors.isAuthenticated(state),
  );
  const user = useSelector((state) => userSelectors.user(state));
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const listenScrollEvent = () => {
    setScrolling(window.scrollY !== 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      clearTimeout(typingTimeoutRef.current);
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  const handleSearchChange = (e) => {
    const { value } = e.target;
    if (value === '') {
      history.push('/');
    } else {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      typingTimeoutRef.current = setTimeout(() => {
        history.push({
          pathname: '/search',
          search: `?q=${value}`,
        });
      }, 0);
    }
  };

  const handleShowMenuResponsive = () => {
    setShowMenuResponsive(!showMenuResponsive);
  };

  return (
    <>
      <div
        className={`navbar__wrap fixed top-0 z-20 w-full transition-all duration-800 ease-in-out ${
          scrolling || showMenuResponsive ? 'bg-black-body' : 'bg-transparent'
        } ${addClass}`}
      >
        <div className='navbar h-4.1rem lg:h-6.8rem px-4% flex items-center justify-between w-full bg-navbar'>
          <div className='navbar__left flex'>
            <div
              className={`navbar__menu--tablet w-2.5rem z-1 cursor-pointer block lg:hidden mr-6 ${
                showMenuResponsive ? 'checked' : ''
              }`}
              onClick={handleShowMenuResponsive}
            >
              <span className='navbar__menu--tablet-icon relative transform -translate-y-1/2 top-1/2'>
                &nbsp;
              </span>
            </div>
            <Link
              className='flex items-center'
              to='/'
              onClick={() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
                setShowSearchBox(false);
              }}
            >
              <img
                // eslint-disable-next-line max-len
                src='https://res.cloudinary.com/dcrfjkvlm/image/upload/v1693887959/logoVfilx_whdgzd.png'
                alt='Logo'
                className='h-2rem lg:h-2.5rem'
              />
            </Link>
            <div className='navbar__left-genre relative ml-10'>
              <button
                type='button'
                className='navbar__left-genre-header hidden lg:flex h-full items-center text-white text-16 font-bold border border-white px-4 py-2 bg-black bg-opacity-90 cursor-pointer relative z-1 focus:outline-none'
                onClick={() => setShowGenre(!showGenre)}
                onBlur={() => setShowGenre(false)}
              >
                Thể loại
                <FaCaretDown className='ml-6' />
              </button>
              <ul
                className={`navbar__left-genre-list hidden lg:flex flex-wrap w-50rem absolute top-full left-0 bg-black bg-opacity-90 border border-gray-primary-d py-2 transition-all duration-200 ${
                  showGenre ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                {categories.map((genre) => (
                  <li key={genre._id} className='w-1/3 text-14 text-white'>
                    <Link
                      className='w-full block py-2 px-4 relative hover:underline'
                      to={`/category?genre=${genre.genre}`}
                    >
                      {genre.genre === query.get('genre') ? (
                        <div className='absolute w-0.25rem h-full top-0 left-0 bg-red-primary' />
                      ) : null}
                      <span
                        className={
                          genre.genre === query.get('genre')
                            ? 'font-bold text-white'
                            : null
                        }
                      >
                        {genre.vn}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className='navbar__right flex'>
            <div className='navbar__serachBox lg:mr-12 flex'>
              {showSearchBox || window.innerWidth <= 1024 ? (
                <div className='flex items-center border border-white px-2 py-1 sm:px-2 sm:py-2 bg-black bg-opacity-90'>
                  <FaSearch className='text-14 sm:text-18 text-white mr-4' />
                  <input
                    type='text'
                    ref={inputNode}
                    onBlur={() => {
                      if (pathname !== '/search' && window.innerWidth > 1024) {
                        setTimeout(() => setShowSearchBox(false), 200);
                      }
                    }}
                    placeholder='Tên phim,...'
                    onChange={handleSearchChange}
                    className={`focus:outline-none bg-transparent text-14 text-white transition-width duration-200 w-10rem ${
                      window.innerWidth <= 1024
                        ? 'sm:w-16rem'
                        : pathname === '/search'
                        ? 'w-26rem'
                        : 'w-0 focus:w-26rem'
                    }`}
                  />
                </div>
              ) : (
                <button
                  type='button'
                  aria-label='Tìm kiếm phim'
                  onClick={() => {
                    setShowSearchBox(true);
                    setTimeout(() => inputNode.current.focus(), 0);
                  }}
                >
                  <FaSearch className='text-18 text-white' />
                </button>
              )}
            </div>
            {window.innerWidth < 1024 ? null : !isAuthenticated ? (
              <div
                onClick={history.push('/login')}
                className='navbar__btn bg-red-primary hover:bg-red-primary-d text-14 lg:text-16 px-3 py-1 lg:px-7 lg:py-3 cursor-pointer'
              >
                Đăng nhập
              </div>
            ) : (
              <div className='relative group'>
                <div className='flex items-center cursor-pointer'>
                  <div className='w-3.5rem h-3.5rem overflow-hidden rounded-md'>
                    <img
                      className='object-cover w-full h-full'
                      src={user.get('imageUser')}
                      alt='avatar'
                    />
                  </div>
                  <FaCaretDown className='ml-2 text-white text-16 transform transition-all duration-400 group-hover:rotate-180' />
                </div>
                <div className='navbar__right-menuUser absolute w-20rem top-5rem right-0 bg-black bg-opacity-90 border border-gray-primary transition-all duration-200 invisible opacity-0 group-hover:opacity-100 group-hover:visible'>
                  <div className='border-b border-gray-primary-d px-6 py-4 flex flex-col'>
                    <p className='text-white font-bold text-16 mb-4'>
                      {user.get('userName')}
                    </p>
                    <Link
                      className='text-14 leading-10 block text-white hover:underline'
                      to='/user/account'
                    >
                      Quản lý tài khoản
                    </Link>
                  </div>
                  <span
                    className='text-14 block text-white font-bold hover:underline cursor-pointer px-6 py-4'
                    onClick={() => dispatch(userActions.logout())}
                  >
                    Đăng xuất
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <NavbarResponsive
        toggle={handleShowMenuResponsive}
        className={showMenuResponsive ? 'show' : ''}
      />
    </>
  );
};

Navbar.propTypes = {
  addClass: PropTypes.string,
};

Navbar.defaultProps = {
  addClass: '',
};

export default Navbar;
