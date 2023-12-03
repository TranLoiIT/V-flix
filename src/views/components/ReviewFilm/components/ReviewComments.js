import PropTypes from 'prop-types';
import React from 'react';
import RatingStar from 'views/components/RatingStar';

const ReviewComments = (props) => {
  const { reviews } = props;

  return (
    <div className='reviewFilm__comments' style={{ maxHeight: 640, overflow: 'auto' }}>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div
            key={review._id}
            className='productReview flex border-b border-gray-primary-d py-1.5rem px-1rem w-full'
          >
            <img
              src={review.user.imageUser}
              alt='avatar'
              className='w-4rem h-4rem sm:w-5rem sm:h-5rem mr-1.5rem rounded-md'
            />
            <div className='reviewFilm__comment-info'>
              <span className='text-16 block font-bold text-red-primary mb-1'>
                {review.user.userName}
              </span>
              <RatingStar
                className='reviewFilm__comment-info-star'
                ratingPercent={review.rating * 20}
              />
              <p className='mt-1rem text-14'>{review.comment}</p>
            </div>
          </div>
        ))
      ) : (
        <span className='reviewFilm__noComments'>Chưa có bình luận</span>
      )}
    </div>
  );
};

ReviewComments.propTypes = {
  reviews: PropTypes.array.isRequired,
};

export default React.memo(ReviewComments);
