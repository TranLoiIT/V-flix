import { Modal } from '@material-ui/core';
import { deleteFilmApi, deleteSoftFilmApi, restoreFilmApi } from 'apis/filmApi';
import { TYPE_TOAS_MESSAGE } from 'constant';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FaEdit, FaTrashAlt, FaTrashRestore } from 'react-icons/fa';
import { MdRemoveCircle } from 'react-icons/md';
import { VscClose } from 'react-icons/vsc';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { categoriesSelectors } from 'state/modules/categories';
import capitalizeFirstLetter from 'utils/capitalizeFirstLetter';
import { toastMessage } from 'utils/toastMessage';

const RowTableFilms = (props) => {
  const { film, isBin, index, handleFlag, setLoading } = props;
  const { poster, title, titleSearch, actor, genre, description } = film;
  const categories = useSelector((state) =>
    categoriesSelectors.categories(state),
  ).toJS();

  const [state, setState] = useState({
    lastSlug: '',
    modalWarning: false
  })

  const handleRestore = async (data) => {
    try {
      await restoreFilmApi(data._id, {
        "softDelete": false
      });
      setTimeout(() => handleFlag(), 500);
      toastMessage({
        type: TYPE_TOAS_MESSAGE.SUCCESS,
        message: `Đã khôi phục phim ${data.title}`,
      });
      setLoading(true);
    } catch (err) {
      const { response } = err
      toastMessage({
        type: TYPE_TOAS_MESSAGE.ERROR,
        message: response.data.error,
      })
    }
  };

  const handleDelete = async (id) => {
    try {
      if (!isBin) {
        await deleteSoftFilmApi(id);
        setState({
          ...state,
          lastSlug: id,
        });
        setTimeout(() => handleFlag(), 500);
        toastMessage({
          type: TYPE_TOAS_MESSAGE.SUCCESS,
          message: 'Đã chuyển phim vào thùng rác (Truy cập thùng rác để khôi phục)',
        })
        setLoading(true);
      } else {
        await deleteFilmApi(id);
        setTimeout(() => handleFlag(), 500);
        toastMessage({
          type: TYPE_TOAS_MESSAGE.SUCCESS,
          message: 'Phim đã bị xóa vĩnh viễn',
        })
        setLoading(true);
      }
    } catch (err) {
      const { response } = err
      toastMessage({
        type: TYPE_TOAS_MESSAGE.ERROR,
        message: response.data.error,
      })
    }
  };

  return (
    <tr key={film._id}>
      <Modal
        open={state.modalWarning}
        onClose={() => {
          setState({
            ...state,
            modalWarning: !state.modalWarning,
          });
        }}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='flex items-center justify-center'
      >
        <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
          <div
            className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
            onClick={() => {
              setState({
                ...state,
                modalWarning: false,
              });
            }}
          >
            <VscClose className='text-30 text-white' />
          </div>
          <MdRemoveCircle className='text-80 text-red-primary' />
          <h3 className='text-30 text-red-primary mt-6 pb-4 font-bold'>
            CẢNH BÁO
          </h3>
          <span className='text-20 mb-16 block w-85% text-center text-red-primary'>
            Hành động xóa này không thể khôi phục cân nhắc trước khi xóa
          </span>
          <span className='text-20 text-white mb-10 text-center'>
            Bạn có chắc muốn xóa ?
          </span>
          <button
            type='button'
            className='py-4 px-10 bg-red-primary hover:bg-red-primary-d text-20 rounded-md text-white'
            onClick={() => handleDelete(film._id)}
          >
            Đồng ý
          </button>
        </div>
      </Modal>
      <td className='text-center pl-3rem pt-4'>{index + 1}</td>
      <td className=''>
        {/* <div className='relative left-1/2 transform -translate-x-1/2'> */}
        <img src={poster} alt='image-poster' className='object-cover w-4/5' style={{ height: 240 }}  />
        {/* </div> */}
      </td>
      <td className='h-18rem overflow-y-auto'>
        <span className='block mb-2'>
          <strong className='text-gray-primary-l'>Tên phim:</strong>
          {` ${title}`}
        </span>
        <span>
          <strong className='text-gray-primary-l'>Tên tìm kiếm:</strong>
          {` ${titleSearch}`}
        </span>
      </td>
      <td className='capitalize'>{capitalizeFirstLetter(actor.join(', '))}</td>
      <td>
        {categories
          .filter((item) => {
            for (let i = 0; i < genre.length; i++) {
              if (item.genre === genre[i]) {
                return true;
              }
            }
            return false;
          })
          .map((item) => item.vn)
          .join(', ')}
      </td>
      <td className='w-full h-18rem overflow-y-auto inline-block'>
        {description}
      </td>
      <td>
        {isBin ? (
          <FaTrashRestore
            className='btnAction cursor-pointer text-orange-primary hover:text-orange-primary-d text-28 transition-all duration-200'
            onClick={() => handleRestore(film)}
          />
        ) : (
          <Link
            to={`/admin/films/${film.slug}`}
            className='flex justify-center cursor-pointer'
            aria-label='Sửa phim'
          >
            <FaEdit className='text-blue-facebook hover:text-blue-facebook-d text-26 transition-all duration-200' />
          </Link>
        )}
      </td>
      <td className='pr-1rem'>
        <div className='flex justify-center cursor-pointer'>
          {isBin ? (
            <FaTrashAlt
              className='btnAction text-red-primary hover:text-red-primary-d text-28 transition-all duration-200'
              onClick={() =>
                setState({
                  ...state,
                  modalWarning: true,
                })
              }
            />
          ) : (
            <MdRemoveCircle
              className='btnAction text-red-primary hover:text-red-primary-d text-28 transition-all duration-200'
              onClick={() => handleDelete(film._id)}
            />
          )}
        </div>
      </td>
    </tr>
  );
};

RowTableFilms.propTypes = {
  film: PropTypes.object.isRequired,
  isBin: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  handleFlag: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired
}

export default RowTableFilms;
