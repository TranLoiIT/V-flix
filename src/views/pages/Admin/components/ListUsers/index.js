/* eslint-disable indent */
/* eslint-disable func-names */
import { Modal, Snackbar } from '@material-ui/core';
import { deleteHartUser, deleteSoftUSer, getUsersFilterApi, updateUserApi } from 'apis/userApi';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { FcCheckmark } from 'react-icons/fc';
import { TiDeleteOutline } from 'react-icons/ti';
import { VscClose } from 'react-icons/vsc';
import { Link } from 'react-router-dom';
import { Loading } from 'utils/Loadable';
import FilterAdmin from '../FilterAdmin';
import ChangePasswordUser from './components/ChangePasswordUser';
import RowTableUsers from './components/RowTableUsers';
import UpdateUser from './components/UpdateUser';
import sortOptions from './data';
import './style.scss';
import { toastMessage } from 'utils/toastMessage';
import { TYPE_TOAS_MESSAGE } from 'constant';
import { MdRemoveCircle } from 'react-icons/md';

const ListUsers = (props) => {
  const [state, setState] = useState({
    sortUsers: sortOptions[0],
    users: [],
    flag: true,
    search: '',
    modalUpdateUser: false,
    modalChangePassword: false,
    currentUser: {},
  });
  const [isCheckBin, setIsCheckBin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [userDelete, setUserDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get data from store
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const queryObj = {};
        if (state.search) {
          queryObj.q = state.search;
        }
        const query = queryString.stringify(queryObj);
        const responseAll = await getUsersFilterApi(query ? `?${query}` : query, '');
        setState((newState) => ({
          ...newState,
          sortUsers: sortOptions[0],
          users: responseAll.data,
          modalUpdateUser: false,
        }));
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, [state.flag]);

  const getDataUser = async (bin) => {
    try {
      setLoading(true);
      const status = bin ? `?bin=${bin}`: '';
      const res = await getUsersFilterApi('', status);
      setState((newState) => ({
        ...newState,
        users: res.data
      }));
      setIsCheckBin(!bin);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  const handleDeleteUser = async () => {
    try {
      setLoading(true);
      const res = await deleteHartUser(userDelete._id, {
        softDelete: false
      });
      let currentUser = state.users;
      currentUser = currentUser.filter(item => item._id !== userDelete._id)
      setState({
        ...state,
        users: currentUser
      })
      toastMessage({
        type: TYPE_TOAS_MESSAGE.SUCCESS,
        message: 'Xóa người dùng thành công!'
      })
    } catch (error) {
      const { response } = error;
      toastMessage({
        type: TYPE_TOAS_MESSAGE.ERROR,
        message: response.data.error,
      });
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  }

  const handleResortUser = async (data) => {
    try {
      setLoading(true);
      const res = await updateUserApi(data._id, {
        softDelete: false
      });
      let currentUser = state.users;
      currentUser = currentUser.filter(item => item._id !== data._id)
      setState({
        ...state,
        users: currentUser
      })
      toastMessage({
        type: TYPE_TOAS_MESSAGE.SUCCESS,
        message: 'Khôi phục tài khoản thành công!'
      })
    } catch (error) {
      const { response } = error;
      toastMessage({
        type: TYPE_TOAS_MESSAGE.ERROR,
        message: response.data.error,
      });
    } finally {
      setLoading(false)
    }
  }
  
  const handleRemoveUser = async (data) => {
    try {
      setLoading(true);
      const res = await deleteSoftUSer(data._id);
      let currentUser = state.users;
      currentUser = currentUser.filter(item => item._id !== data._id)
      setState({
        ...state,
        users: currentUser
      })
      toastMessage({
        type: TYPE_TOAS_MESSAGE.SUCCESS,
        message: 'Xoá thành công người dùng!'
      })
    } catch (error) {
      const { response } = error;
      toastMessage({
        type: TYPE_TOAS_MESSAGE.ERROR,
        message: response.data.error,
      });
    } finally {
      setLoading(false)
    }
  }

  const handleFlag = () => {
    setState({
      ...state,
      flag: !state.flag,
    });
  };

  const handleSortUsers = (option) => {
    setState({
      ...state,
      sortUsers: option,
    });
  };

  const handleUsers = (option) => {
    setState({
      ...state,
      sortUsers: option,
      users: state.users.sort((a, b) => {
        const reverse = option.value === 'dateZa' || option.value === 'nameZa';
        switch (option.type) {
          case 'name':
            if (reverse) {
              return a.userName < b.userName
                ? 1
                : a.userName > b.userName
                ? -1
                : 0;
            }
            return a.userName < b.userName
              ? -1
              : a.userName > b.userName
              ? 1
              : 0;
          case 'date':
            return !reverse
              ? new Date(b.date) - new Date(a.date)
              : new Date(a.date) - new Date(b.date);
          default:
            return new Date(b.date) - new Date(a.date);
        }
      }),
    });
  };

  const handleSearch = (value) => {
    setState({
      ...state,
      search: value,
    });
  };

  const handleSnackBar = (mess) => {
    toastMessage({
      type: TYPE_TOAS_MESSAGE.SUCCESS,
      message: mess,
    });
  }

  const toggleModalUpdateUser = () => {
    setState({
      ...state,
      modalUpdateUser: !state.modalUpdateUser,
    });
  };

  const toggleModalChangePassword = () => {
    setState({
      ...state,
      modalChangePassword: !state.modalChangePassword,
    });
  };

  return (
    <div className='listUsers w-4/5 mx-auto relative opacity-80'>
      <Helmet>
        <title>Admin - Quản lý người dùng</title>
      </Helmet>

      <FilterAdmin
        sortData={state.sortUsers}
        handleData={handleUsers}
        handleSortData={handleSortUsers}
        handleFlag={handleFlag}
        handleSearch={handleSearch}
      />
      <div className='bg-black-body flex flex-col pb-6 rounded-xl overflow-hidden'>
        <div className='flex bg-black-navbar px-8 justify-between items-center border-b border-gray-primary-d'>
          <h1 className='listUsers__heading text-24 font-bold text-white py-4'>
            Danh sách người dùng
          </h1>
          <div className='flex items-center gap-5'>
            <Link
              to='/admin/manage/users/register'
              className='bg-red-primary text-16 text-white py-3 px-6 rounded-md hover:bg-red-primary-d'
            >
              Thêm người dùng
            </Link>
            <div
              onClick={() => getDataUser(isCheckBin)}
              className='border border-red-primary text-16 text-red-primary py-3 px-6 rounded-md hover:bg-gray-primary-d cursor-pointer'
            >
              {isCheckBin ? 'Thùng rác' : 'Danh sách người dùng'}
            </div>
          </div>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <div className='listUsers__wrapTable h-50rem'>
            <Modal
              open={state.modalUpdateUser}
              onClose={toggleModalUpdateUser}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
              className='flex items-center justify-center'
            >
              <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
                <div
                  className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
                  onClick={toggleModalUpdateUser}
                >
                  <VscClose className='text-30 text-white' />
                </div>
                <UpdateUser
                  currentUser={state.currentUser}
                  setFlag={() => setState({ ...state, flag: !state.flag })}
                  handleSnackBar={handleSnackBar}
                />
              </div>
            </Modal>
            <Modal
              open={state.modalChangePassword}
              onClose={toggleModalChangePassword}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
              className='flex items-center justify-center'
            >
              <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
                <div
                  className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
                  onClick={toggleModalChangePassword}
                >
                  <VscClose className='text-30 text-white' />
                </div>
                <ChangePasswordUser
                  user={state.currentUser}
                  toggleModalChangePassword={toggleModalChangePassword}
                  handleSnackBar={handleSnackBar}
                />
              </div>
            </Modal>
            <Modal
              open={isOpen}
              onClose={() => setIsOpen(false)}
              aria-labelledby='simple-modal-title'
              aria-describedby='simple-modal-description'
              className='flex items-center justify-center'
            >
              <div className='bg-black-body flex items-center flex-col overflow-hidden rounded-2xl outline-none relative px-8 py-14 sm:px-24 sm:py-24'>
                <div
                  className='absolute top-1rem sm:top-3rem right-1rem sm:right-3rem bg-black-body hover:bg-gray-primary-d transition-all duration-200 p-2 rounded-full cursor-pointer'
                  onClick={() => setIsOpen(false)}
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
                  onClick={() => handleDeleteUser()}
                >
                  Đồng ý
                </button>
              </div>
            </Modal>
            <table className='w-full'>
              <thead>
                <tr>
                  <th className='pl-3rem' style={{ width: '5%' }}>
                    Stt
                  </th>
                  <th>Avatar</th>
                  <th style={{ width: '25%' }}>Tên</th>
                  <th style={{ width: '25%' }}>Email</th>
                  {
                    isCheckBin && <th style={{ width: '20%' }}>Ngày tham gia</th>
                  }
                  {
                    isCheckBin && <th style={{ width: '10%' }}>Trạng thái</th>
                  }
                  <th className='pr-1rem' style={{ width: '10%' }}>
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {state.users.map((user, index) => (
                  <RowTableUsers
                    key={user._id}
                    user={user}
                    index={index}
                    isCheckBin={isCheckBin}
                    handleUpdateUser={(currentUser) =>
                      setState({
                        ...state,
                        currentUser,
                        modalUpdateUser: !state.modalUpdateUser,
                      })
                    }
                    handleChangePassword={(currentUser) =>
                      setState({
                        ...state,
                        currentUser,
                        modalChangePassword: !state.modalChangePassword,
                      })
                    }
                    handleRemoveUser={handleRemoveUser}
                    handleSnackBar={handleSnackBar}
                    handleDeleteUser={() => {
                      setUserDelete(user);
                      setIsOpen(true);
                    }}
                    handleResortUser={handleResortUser}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(ListUsers);
