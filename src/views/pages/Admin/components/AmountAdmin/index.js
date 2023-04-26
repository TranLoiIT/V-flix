import { getAmountAdminApi } from 'apis/adminApi';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { RiApps2Fill, RiFilmFill, RiUserFill } from 'react-icons/ri';
import { Loading } from 'utils/Loadable';

const AmountAdmin = (props) => {
  const { flag } = props;
  const [state, setState] = useState({
    amountAdmin: {},
    loading: true,
  });

  useEffect(() => {
    const getAmount = async () => {
      setState({
        ...state,
        loading: true,
      });
      const responseAmount = await getAmountAdminApi();
      setState((newState) => ({
        ...newState,
        loading: false,
        amountAdmin: responseAmount.data,
      }));
    };

    getAmount();
    // eslint-disable-next-line
  }, [flag]);

  return (
    <div className='flex w-4/5 my-20 mx-auto justify-between opacity-80'>
      {state.loading ? (
        <Loading />
      ) : (
        <>
          <div className='flex flex-1 mr-20 bg-black-navbar px-20 py-20 rounded-xl relative'>
            <div className='text-white'>
              <span className='text-18'>Số lượng người dùng</span>
              <h3 className='text-60 leading-60 mt-2 font-bold'>
                {state.amountAdmin.users}
              </h3>
            </div>
            <div className='text-white text-100'>
              <RiUserFill />
            </div>
          </div>
          <div className='flex flex-1 mr-20 bg-black-navbar px-20 py-20 justify-between rounded-xl'>
            <div className='text-white'>
              <span className='text-18'>Số lượng phim</span>
              <h3 className='text-60 leading-60 mt-2 font-bold'>
                {state.amountAdmin.films}
              </h3>
            </div>
            <div className='text-white text-100'>
              <RiFilmFill />
            </div>
          </div>
          <div className='flex flex-1 bg-black-navbar px-20 py-20 justify-between rounded-xl'>
            <div className='text-white'>
              <span className='text-18'>Số lượng thể loại</span>
              <h3 className='text-60 leading-60 mt-2 font-bold'>
                {state.amountAdmin.categories}
              </h3>
            </div>
            <div className='text-white text-100'>
              <RiApps2Fill />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

AmountAdmin.propTypes = {
  flag: PropTypes.bool.isRequired,
};

export default React.memo(AmountAdmin);
