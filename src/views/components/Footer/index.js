/* eslint-disable max-len */
import React from 'react';
import { FaFacebookF, FaWikipediaW } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='footer flex flex-col sm:flex-row justify-center items-center border-t-4 border-red-primary py-4rem relative'>
      <img
        src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1615915194/logoVMO-PNG-02_ybelrn.webp'
        alt='logo'
        className='w-10rem mb-8 sm:mb-0 md:mr-4rem lg:w-20rem '
      />
      <div className='flex flex-start flex-col sm:flex-row justify-center items-center '>
        <div className='footer__about items-center sm:justify-center flex flex-col sm:flex-rol w-20rem md:w-40rem mr-0 sm:mr-4rem mb-6 sm: mb-0'>
          <img
            src='https://res.cloudinary.com/nghiemduong2000/image/upload/v1618458158/VMOflix%20Project/VMOflix%20-%20base/VMOFLIX-02-02_bpjidv.webp'
            alt='logo'
            className='w-8rem sm:w-8rem md:w-10rem ld:w-14rem mb-4'
          />
          <p className='text-14 sm:text-16 text-white text-center sm:text-left'>
            Trang xem phim trực tuyến hàng đầu Việt Nam, luôn cập nhật những
            phim chiếu rạp hay nhất, mới nhất ở cả điện ảnh Việt Nam và Thế
            Giới.
          </p>
        </div>
        <div className='footer__contact'>
          <h3 className='text-20 font-bold text-white mb-4'>LIÊN HỆ</h3>
          <ul className='flex justify-center sm:justify-start'>
            <li className='mr-2'>
              <a
                href='https://www.facebook.com/Vmogroup2012'
                target='_blank'
                rel='noreferrer'
                aria-label='Đường dẫn Facebook'
                className='block bg-red-primary w-3.5rem h-3.5rem flex items-center justify-center rounded-md hover:bg-red-primary-d transition-all duration-200'
              >
                <FaFacebookF className='text-18 text-black-body' />
              </a>
            </li>
            <li>
              <a
                href='https://www.vmogroup.com/'
                target='_blank'
                aria-label='Đường dẫn Website'
                rel='noreferrer'
                className='block bg-red-primary w-3.5rem h-3.5rem flex items-center justify-center rounded-md hover:bg-red-primary-d transition-all duration-200'
              >
                <FaWikipediaW className='text-18 text-black-body' />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
