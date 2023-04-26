/* eslint-disable max-len */
/* eslint-disable indent */
/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import React from 'react';

const InputImageUrl = (props) => {
  const { className, placeholder, value, setState, styleContainer } = props;

  const handleOnChange = (e) => {
    setState(e.target.value);
  };

  const imagePreview = (url) => {
    return <img className={`${className}`} src={url} alt='poster' />;
  };

  return (
    <div
      className={` text-white flex flex-col items-center content-between flex-1 ${styleContainer}`}
    >
      {value ? imagePreview(value) : null}
      <input
        type='text'
        className='bg-transparent focus:outline-none py-6 px-8 rounded-md bg-gray-primary-d text-16 text-white w-full border-b border-gray-primary'
        onChange={handleOnChange}
        placeholder={placeholder}
        value={value}
      />
    </div>
  );
};

InputImageUrl.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  styleContainer: PropTypes.string,
};

InputImageUrl.defaultProps = {
  styleContainer: '',
  className: '',
};

export default InputImageUrl;
