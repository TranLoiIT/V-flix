/* eslint-disable indent */
/* eslint-disable func-names */
import { addCategoryApi, deleteCategoryApi, getCategoriesApi, updateCategoryApi } from 'apis/categoryApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Loading } from 'utils/Loadable';
import validation from 'utils/validation';
import './style.scss';
import { FaAngleLeft, FaEdit, FaTrashAlt } from 'react-icons/fa';
import { toastMessage } from 'utils/toastMessage';
import { TYPE_TOAS_MESSAGE } from 'constant';
import { Modal } from '@material-ui/core';
import { VscClose } from 'react-icons/vsc';
import { MdRemoveCircle } from 'react-icons/md';

const CREATE_FORM = 'create';
const EDIT_FORM = 'edit';

const ListCategories = (props) => {
  const { trigger } = props;
  const [state, setState] = useState({
    categories: [],
    flag: true,
    genre: '',
    vn: '',
    genreValue: '',
    vnValue: '',
  });
  const [modalWarning, setModalWarning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [validateForm, setValidateForm] = useState('')
  const [formEdit, setFormEdit] = useState({
    genre: '',
    vn: '',
  });
  const [checkform, setCheckForm] = useState(CREATE_FORM);
  const [isShowList, setIsShowList] = useState(true);

  // Get data from store
  const getData = async () => {
    try {
      setLoading(true);
      const responseAll = await getCategoriesApi();
      setState((newState) => ({
        ...newState,
        categories: responseAll.data,
      }));
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

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
          type: TYPE_TOAS_MESSAGE.SUCCESS,
          message: 'Thêm mới thành công!'
        });
      } else {
        setValidateForm('Điền tất cả các ô trống');
      }
    } catch (error) {
      toastMessage({type: TYPE_TOAS_MESSAGE.ERROR, message: 'Thêm mới thất bại!'});
    }
  };

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      if (validation(formEdit.genre.trim(), formEdit.vn.trim())) {
        // api edit
        const data = {
          genre: formEdit.genre.trim(),
          vn: formEdit.vn.trim(),
        }
        await updateCategoryApi(formEdit._id || 0, data);

        const currentCategory = state.categories;
        const idxCategory = currentCategory.findIndex((item) => item._id === formEdit?._id);
        currentCategory[idxCategory] = {
          ...currentCategory[idxCategory],
          ...data,
        };

        setTimeout(() => {
          setState({
            ...state,
            categories: currentCategory,
          });
          trigger();
          setIsShowList(true);
          toastMessage({type: TYPE_TOAS_MESSAGE.SUCCESS, message: 'Cập nhập thành công!'});
        }, 500);
      } else {
        setValidateForm('Điền tất cả các ô trống');
      }
    } catch (error) {
      const { response } = error;
      toastMessage({type: TYPE_TOAS_MESSAGE.ERROR, message: response.data.error});
    }
  }

  useEffect(() => {
    getData();
    return () => {
      setState({
        categories: [],
        flag: true,
        genre: '',
        vn: '',
        validate: '',
        genreValue: '',
        vnValue: '',
      });
      // setLoading(true);
    };
    // eslint-disable-next-line
  }, [state.flag]);

  const handleDelete = async () => {
    try {
      if (validation(formEdit.genre.trim(), formEdit.vn.trim())) {
        await deleteCategoryApi(formEdit._id);
        const currentCategory = state.categories.filter((item) => item?._id !== formEdit?._id)
        setTimeout(() => {
          setState({
            ...state,
            categories: currentCategory,
          });
          trigger();
          setIsShowList(true);
          toastMessage({type: TYPE_TOAS_MESSAGE.SUCCESS, message: 'Cập nhập thành công!'});
        }, 500);
      } else {
        setValidateForm('Điền tất cả các ô trống');
      }
    } catch (error) {
      console.log(error);
      toastMessage({type: TYPE_TOAS_MESSAGE.ERROR, message: 'Cập nhập thể loại thât bại!'});
    }
  }

  return (
    <div className='listCategories w-4/5 mx-auto relative opacity-80'>
      <Helmet>
        <title>Admin - Quản lý thể loại</title>
      </Helmet>
      <Modal
        open={modalWarning}
        onClose={() => setModalWarning(false)}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
        className='flex items-center justify-center'
      >
        <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
          <div
            className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
            onClick={() => setModalWarning(false)}
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
            onClick={() => handleDelete()}
          >
            Đồng ý
          </button>
        </div>
      </Modal>
      <div className='flex justify-end'>
        <button
          type='button'
          onClick={() => {
            setIsShowList(false);
            setCheckForm(CREATE_FORM);
          }}
          className='text-white bg-red-primary text-20 font-bold py-6 px-3 rounded-md mb-12 leading-20 text-center hover:bg-red-primary-d transition duration-200'
        >
          Thêm mới thể loại
        </button>
      </div>
      {
        isShowList ? (
          <div className='flex-1 bg-black-body flex flex-col pb-6 rounded-xl overflow-hidden'>
            <div className='flex bg-black-navbar px-8 justify-between items-center border-b border-gray-primary-d'>
              <h1 className='listCategories__heading text-24 font-bold text-white py-4'>
                Danh sách thể loại
              </h1>
            </div>
            {loading ? (
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
                          <td className='flex items-center justify-center gap-3'>
                            <FaEdit
                              onClick={() => {
                                setFormEdit(category);
                                setCheckForm(EDIT_FORM);
                                setIsShowList(false);
                              }}
                              className='text-blue-facebook hover:text-blue-facebook-d text-26 transition-all duration-200 cursor-pointer'
                            />
                            <FaTrashAlt
                              className='btnAction text-red-primary hover:text-red-primary-d text-28 transition-all duration-200 cursor-pointer'
                              onClick={() => {
                                setModalWarning(true);
                                setFormEdit(category);
                              }}
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
        ) : (
          <div className='flex-1 bg-black-body flex flex-col pb-6 rounded-xl overflow-hidden'>
            <div className='flex bg-black-navbar px-8 py-6 justify-start items-center border-b border-gray-primary-d gap-8'>
              <div
                className='cursor-pointer'
                onClick={() => {
                  setIsShowList(true);
                }}
              >
                <FaAngleLeft className='text-24 sm:text-30 text-white font-bold' />
              </div>
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
                  {/* <div
                    className='text-16 text-center text-white mt-6 underline underline-offset-1 cursor-pointer'
                    onClick={() => setIsShowList(true)}
                  >
                    Quay lại
                  </div> */}
                </form>
            )}
          </div>
        )
      }
    </div>
  );
};

ListCategories.propTypes = {
  trigger: PropTypes.func.isRequired,
};

export default React.memo(ListCategories);
