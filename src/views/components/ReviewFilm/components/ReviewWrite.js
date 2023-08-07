import { Snackbar } from '@material-ui/core';
import { updateFilmApi } from 'apis/filmApi';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { FcCheckmark } from 'react-icons/fc';
import { TiDeleteOutline } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { userSelectors } from 'state/modules/user';
import { v4 as uuidv4 } from 'uuid';
import RatingStar from 'views/components/RatingStar';
import ReviewComments from './ReviewComments';

const ReviewWrite = (props) => {
  const { currentFilm, handleUpdateFilm } = props;
  const { reviews } = currentFilm;
  const location = useLocation();
  const isAuthenticated = useSelector((state) =>
    userSelectors.isAuthenticated(state),
  );

  const user = useSelector((state) => userSelectors.user(state));
  const [state, setState] = useState({
    comment: '',
    rating: '',
    loading: false
  });

  const [error, setError] = useState('');

  const handleChangeVote = (value) => {
    setState({
      ...state,
      rating: value
    })
  };

  // Submit comment review
  const onSubmitComment = async (e) => {
    try {
      e.preventDefault();
      if (state.rating > 0 && state.comment) {
        const idReview = uuidv4();

        const newReviews = [...reviews];
        const { _id, imageUser, userName, userEmail } = user.toJS();

        newReviews.unshift({
          _id: idReview,
          user: { _id, imageUser, userName, userEmail },
          rating: state.rating,
          comment: state.comment,
        });

        await updateFilmApi(currentFilm._id, { reviews: newReviews });

        handleUpdateFilm({ ...currentFilm, reviews: newReviews });
        setState({
          ...state,
          rating: 0,
          comment: '',
          loading: true
        })
      } else {
        setError('Vui lòng nhập sao và bình luận');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='reviewFilm__write'>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={state.loading}
        autoHideDuration={6000}
        onClose={() => setState({
          ...state,
          loading: false
        })}
        message={(
          <div className='flex items-center mr-10'>
            <FcCheckmark className='text-20 leading-20' />
            <span className='text-20 ml-4'>Bình luận đã được gửi</span>
          </div>
        )}
        action={(
          <TiDeleteOutline
            className='pr-4 text-30 text-red-primary leading-20 cursor-pointer'
            onClick={() => setState({
              ...state,
              loading: false
            })}
          />
        )}
      />
      <div className='reviewFilm__write-form'>
        <h4>Bình luận</h4>
        {isAuthenticated ? (
          <form
            className='py-1.5rem px-2rem sm:px-2.5rem bg-black-navbar bg-opacity-50'
            onSubmit={onSubmitComment}
          >
            {error ? (
              <div className='text-14 text-red-primary border border-red-primary px-5 py-3 bg-black-body rounded-md'>
                {error}
              </div>
            ) : null}
            <div className='reviewFilm__write-ratingWrap'>
              <span>Đánh giá:</span>
              <RatingStar
                className='reviewFilm__write-rating'
                handleChangeVote={handleChangeVote}
                ratingPercent={state.rating * 20}
              />
            </div>
            <textarea
              placeholder='Mời bạn viết bình luận ...'
              className='reviewFilm__write-comment'
              value={state.comment}
              onChange={(e) => setState({
                ...state,
                comment: e.target.value
              })}
            />
            <div className='reviewFilm__write-form-submit'>
              <button
                type='submit'
                className='text-14 font-bold bg-red-primary px-4 py-2 rounded-md transition-all duration-200 hover:bg-red-primary-d focus:outline-none'
              >
                Gửi
              </button>
            </div>
          </form>
        ) : (
          <div className='reviewFilm__write-requireLogin'>
            <span>Vui lòng đăng nhập để bình luận</span>
            <Link
              to={{
                pathname: '/login',
                state: { ...location },
              }}
              className='px-6 py-2 bg-red-primary hover:bg-red-primary-d transtion-all duration-200 text-16 rounded-md'
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </div>
      <ReviewComments reviews={reviews} />
    </div>
  );
};

ReviewWrite.propTypes = {
  handleUpdateFilm: PropTypes.func.isRequired,
  currentFilm: PropTypes.object.isRequired,
};

export default ReviewWrite;
