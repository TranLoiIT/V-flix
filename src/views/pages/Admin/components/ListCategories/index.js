/* eslint-disable indent */
/* eslint-disable func-names */
import { addCategoryApi, getCategoriesApi } from 'apis/categoryApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Loading } from 'utils/Loadable';
import validation from 'utils/validation';
import './style.scss';
import { FaEdit } from 'react-icons/fa';
import { toastMessage } from 'utils/toastMessage';

const CREATE_FORM = 'create';
const EDIT_FORM = 'edit';

const ListCategories = (props) => {
  const { trigger } = props;
  const [state, setState] = useState({
    categories: [],
    loading: true,
    flag: true,
    genre: '',
    vn: '',
    genreValue: '',
    vnValue: '',
  });
  const [validateForm, setValidateForm] = useState('')
  const [formEdit, setFormEdit] = useState({
    genre: '',
    vn: '',
  });
  const [checkform, setCheckForm] = useState(CREATE_FORM);

  // Get data from store
  useEffect(() => {
    (async function () {
      setState({
        ...state,
        loading: true,
      });
      const responseAll = await getCategoriesApi();
      console.log('responseAll', responseAll)
      setState((newState) => ({
        ...newState,
        categories: responseAll.data,
        loading: false,
      }));
    })();
    return () => {
      setState({
        categories: [],
        loading: true,
        flag: true,
        genre: '',
        vn: '',
        validate: '',
        genreValue: '',
        vnValue: '',
      });
    };
    // eslint-disable-next-line
  }, [state.flag]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (validation(state.genre, state.vn)) {
        await addCategoryApi({ genre: state.genre, vn: state.vn });
        setTimeout(() => {
          setState({
            ...state,
            genre: '',
            vn: '',
            flag: !state.flag,
          });
          trigger();
        }, 500);
        toastMessage({
          type: 'success',
          message: 'Thêm mới thành công!'
        });
      } else {
        setValidateForm('Điền tất cả các ô trống');
      }
    } catch (error) {
      toastMessage({type: 'error', message: 'Thêm mới thất bại!'});
    }
  };

  const handleEdit = async (e) => {
    try {
      console.log(e);
      e.preventDefault();
      console.log(1)
      if (validation(formEdit.genre.trim(), formEdit.vn.trim())) {
        console.log(1)
        // api edit
        // setTimeout(() => {
        //   setState({
        //     ...state,
        //     flag: !state.flag,
        //   });
        //   trigger();
        // }, 500);
        setCheckForm(CREATE_FORM);
        toastMessage({type: 'success', messageL: 'Cập nhập thành công!'});
      } else {
        setValidateForm('Điền tất cả các ô trống');
      }
    } catch (error) {
      console.log(error);
      toastMessage({type: 'error', message: 'Cập nhập thể loại thât bại!'});
    }
  }

  return (
    <div className='listCategories flex items-start w-4/5 mx-auto relative opacity-80'>
      <Helmet>
        <title>Admin - Quản lý thể loại</title>
      </Helmet>
      <div className='flex-1 mr-20 bg-black-body rounded-xl overflow-hidden'>
        <div className='flex bg-black-navbar px-8 justify-between items-center border-b border-gray-primary-d'>
          <h1 className='listCategories__heading text-24 font-bold text-white py-4'>
            {checkform === CREATE_FORM && 'Tạo thể loại'}
            {checkform === EDIT_FORM && 'Cập nhập thể loại'}
          </h1>
        </div>
        {
          checkform === CREATE_FORM && (
            <form
              onSubmit={handleSubmit}
              className='listCategories__form bg-opacity-80 px-8 py-14 flex flex-col'
            >
              {!validateForm ? null : (
                <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-18 py-4 px-6 text-red-500'>
                  {validateForm}
                </div>
              )}
              <input
                type='text'
                value={state.genre}
                className='listCategories__form-input mb-6 px-8 py-6 shadow-inner-md text-20 flex-1 bg-gray-primary-d focus:outline-none text-white leading-20 rounded-md'
                placeholder='Tên thể loại'
                onChange={(e) => {
                  setState({
                    ...state,
                    genre: e.target.value,
                  });
                }}
              />
              <input
                type='text'
                value={state.vn}
                className='listCategories__form-input px-8 py-6 shadow-inner-md text-20 flex-1 bg-gray-primary-d focus:outline-none text-white leading-20 rounded-md'
                placeholder='Tên thể loại bằng tiếng việt'
                onChange={(e) =>
                  setState({
                    ...state,
                    vn: e.target.value,
                  })
                }
              />
              <button
                type='submit'
                className='text-white bg-red-primary text-20 font-bold py-6 rounded-md mt-8 leading-20 text-center hover:bg-red-primary-d transition duration-200'
              >
                Tạo thể loại
              </button>
            </form>
        )}
        {/* edit form */}
        {
          checkform === EDIT_FORM && (
            <form
              onSubmit={handleEdit}
              className='listCategories__form bg-opacity-80 px-8 py-14 flex flex-col'
            >
              {!validateForm ? null : (
                <div className='bg-gray-primary-d mb-8 border border-red-500 rounded-lg text-18 py-4 px-6 text-red-500'>
                  {validateForm}
                </div>
              )}
              <input
                type='text'
                value={formEdit.genre}
                className='listCategories__form-input mb-6 px-8 py-6 shadow-inner-md text-20 flex-1 bg-gray-primary-d focus:outline-none text-white leading-20 rounded-md'
                placeholder='Tên thể loại'
                onChange={(e) => {
                  setFormEdit({
                    ...formEdit,
                    genre: e.target.value,
                  });
                }}
              />
              <input
                type='text'
                value={formEdit.vn}
                className='listCategories__form-input px-8 py-6 shadow-inner-md text-20 flex-1 bg-gray-primary-d focus:outline-none text-white leading-20 rounded-md'
                placeholder='Tên thể loại bằng tiếng việt'
                onChange={(e) =>
                  setFormEdit({
                    ...formEdit,
                    vn: e.target.value,
                  })
                }
              />
              <button
                type='submit'
                className='text-white bg-red-primary text-20 font-bold py-6 rounded-md mt-8 leading-20 text-center hover:bg-red-primary-d transition duration-200'
              >
                Cập nhập
              </button>
              <button
                type='button'
                className='text-white bg-red-primary text-20 font-bold py-6 rounded-md mt-8 leading-20 text-center hover:bg-red-primary-d transition duration-200'
              >
                Xóa thể loại
              </button>
              <div
                className='text-16 text-center text-white mt-6 underline underline-offset-1 cursor-pointer'
                onClick={() => {
                  setState({
                    ...state,
                    genre: '',
                    vn: '',
                  });
                  setCheckForm(CREATE_FORM);
                }}
              >
                Quay lại
              </div>
            </form>
        )}
      </div>
      <div className='flex-1 bg-black-body flex flex-col pb-6 rounded-xl overflow-hidden'>
        <div className='flex bg-black-navbar px-8 justify-between items-center border-b border-gray-primary-d'>
          <h1 className='listCategories__heading text-24 font-bold text-white py-4'>
            Danh sách thể loại
          </h1>
        </div>
        {state.loading ? (
          <Loading />
        ) : (
          <div className='listCategories__wrapTable h-50rem'>
            <table className='w-full'>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>Stt</th>
                  <th style={{ width: '40%' }}>Thể loại</th>
                  <th style={{ width: '40%' }}>Thể loại tiếng việt</th>
                  <th style={{ width: '15%' }}>Hoạt động</th>
                </tr>
              </thead>
              <tbody>
                {state.categories.map((category, index) => {
                  const { genre, vn } = category;
                  return (
                    <tr key={category._id}>
                      <td>{index + 1}</td>
                      <td>{genre}</td>
                      <td>{vn}</td>
                      <td className='flex items-center justify-center'>
                        <FaEdit
                          onClick={() => {
                            setFormEdit(category);
                            setCheckForm(EDIT_FORM)
                          }}
                          className='text-blue-facebook hover:text-blue-facebook-d text-26 transition-all duration-200 cursor-pointer'
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

ListCategories.propTypes = {
  trigger: PropTypes.func.isRequired,
};

export default React.memo(ListCategories);
