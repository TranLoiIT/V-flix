import React from 'react';
import { RiApps2Fill, RiFilmFill, RiUserFill } from 'react-icons/ri';
import { Link, useLocation } from 'react-router-dom';
import './style.scss';

const SidebarAdmin = () => {
  const { pathname } = useLocation();

  const isManageFilms = pathname.indexOf('films') !== -1;
  const isManageUsers = pathname.indexOf('users') !== -1;
  const isManageGenres = pathname.indexOf('categories') !== -1;

  return (
    <div className='sidebarAdmin w-30rem bg-black-body relative'>
      <ul className='sidebarAdmin__list'>
        <li className='sidebarAdmin__item text-18 cursor-pointer text-white'>
          <Link
            to='/admin/manage/films'
            className={`relative group ${
              isManageFilms ? 'bg-red-primary bg-opacity-10' : null
            }`}
          >
            <div
              className={`absolute w-0.6rem h-full bg-red-primary left-0 top-0 opacity-0 group-hover:opacity-100 ${
                isManageFilms ? 'opacity-100' : null
              }`}
            />
            <RiFilmFill
              className={`text-22 mr-10 ${
                isManageFilms ? 'opacity-100' : 'opacity-50'
              }`}
            />
            <span className={isManageFilms ? 'opacity-100' : 'opacity-50'}>
              Quản lý phim
            </span>
          </Link>
        </li>
        <li className='sidebarAdmin__item text-18 cursor-pointer text-white'>
          <Link
            to='/admin/manage/users'
            className={`relative group ${
              isManageUsers ? 'bg-red-primary bg-opacity-10' : null
            }`}
          >
            <div
              className={`absolute w-0.6rem h-full bg-red-primary left-0 top-0 opacity-0 group-hover:opacity-100 ${
                isManageUsers ? 'opacity-100' : null
              }`}
            />
            <RiUserFill
              className={`text-22 mr-10 ${
                isManageUsers ? 'opacity-100' : 'opacity-50'
              }`}
            />
            <span className={isManageUsers ? 'opacity-100' : 'opacity-50'}>
              Quản lý người dùng
            </span>
          </Link>
        </li>
        <li className='sidebarAdmin__item text-18 cursor-pointer text-white'>
          <Link
            to='/admin/manage/categories'
            className={`relative group ${
              isManageGenres ? 'bg-red-primary bg-opacity-10' : null
            }`}
          >
            <div
              className={`absolute w-0.6rem h-full bg-red-primary left-0 top-0 opacity-0 group-hover:opacity-100 ${
                isManageGenres ? 'opacity-100' : null
              }`}
            />
            <RiApps2Fill
              className={`text-22 mr-10 ${
                isManageGenres ? 'opacity-100' : 'opacity-50'
              }`}
            />
            <span className={isManageGenres ? 'opacity-100' : 'opacity-50'}>
              Quản lý thể loại
            </span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarAdmin;
